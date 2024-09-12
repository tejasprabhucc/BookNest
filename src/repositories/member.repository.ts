import { IRepository } from "@/src/lib/definitions";
import { IMember, MemberTokens } from "@/src/lib/definitions";
import {
  MemberBaseSchema,
  IMemberBase,
  MemberSchema,
} from "../models/member.schema";
import { MySql2Database } from "drizzle-orm/mysql2";
import { members, memberTokens } from "../orm/schema";
import { count, eq, like, or, sql } from "drizzle-orm";
import { IPagedResponse, IPageRequest } from "@/src/lib/definitions";
import bcrypt from "bcryptjs";

export class MemberRepository implements IRepository<IMemberBase, IMember> {
  constructor(private readonly db: MySql2Database<Record<string, never>>) {}

  async create(data: IMemberBase): Promise<IMember> {
    const validatedData = { ...MemberBaseSchema.parse(data), id: 0 };

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser: IMemberBase = {
      ...validatedData,
      password: hashedPassword,
      role: validatedData.role ?? "user",
    };
    try {
      const [insertId] = await this.db.insert(members).values(newUser);

      return await this.getById(insertId.insertId);
    } catch (error) {
      throw new Error(`Error creating member: ${(error as Error).message}`);
    }
  }

  async update(id: number, data: IMemberBase): Promise<IMember> {
    const memberToUpdate = await this.getById(id);
    if (!memberToUpdate) {
      throw new Error("Member not found");
    }

    const validatedData = MemberBaseSchema.parse(data);
    const updatedMember: IMember = {
      ...memberToUpdate,
      ...validatedData,
    };

    try {
      const [result] = await this.db
        .update(members)
        .set(updatedMember)
        .where(eq(members.id, id))
        .execute();
      if (result.affectedRows > 0) {
        return await this.getById(id);
      } else {
        throw new Error("Could not update member");
      }
    } catch (error) {
      throw new Error("Could not update member");
    }
  }

  async delete(id: number): Promise<IMember> {
    const memberToDelete = await this.getById(id);
    if (!memberToDelete) {
      throw new Error("Member not found");
    }

    try {
      const [result] = await this.db
        .delete(members)
        .where(eq(members.id, id))
        .execute();
      if (result.affectedRows > 0) {
        return memberToDelete;
      } else {
        throw new Error(`Member deletion failed`);
      }
    } catch (error) {
      throw new Error(`Member deletion failed`);
    }
  }

  async getById(id: number): Promise<IMember> {
    try {
      const [member] = (await this.db
        .select()
        .from(members)
        .where(eq(members.id, id))
        .limit(1)
        .execute()) as IMember[];
      if (!member) {
        throw new Error("Member not found");
      }
      return member;
    } catch (error) {
      throw new Error(`Member not found`);
    }
  }

  async list(
    params: IPageRequest
  ): Promise<IPagedResponse<IMember> | undefined> {
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${members.name} LIKE ${search} OR ${members.email} LIKE ${search}`;
    }

    try {
      const matchedMembers = (await this.db
        .select()
        .from(members)
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)) as IMember[];

      if (matchedMembers.length > 0) {
        const [totalMatchedMembers] = await this.db
          .select({ count: count() })
          .from(members)
          .where(searchWhereClause);

        return {
          items: matchedMembers,
          pagination: {
            offset: params.offset,
            limit: params.limit,
            total: totalMatchedMembers.count,
          },
        };
      } else {
        throw new Error("No members found matching the criteria");
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async getByEmail(email: string): Promise<IMember | null> {
    try {
      if (!this.db) {
        return null;
      }
      const [selectedMember] = await this.db
        .select()
        .from(members)
        .where(eq(members.email, email));
      if (!selectedMember) return null;
      return selectedMember as IMember;
    } catch (error) {
      throw error;
    }
  }

  async addTokenEntry(memberId: number, refreshToken: string) {
    try {
      const tokenData = { memberId: BigInt(memberId), refreshToken, id: 0 };

      const [result] = await this.db.insert(memberTokens).values(tokenData);
      if (result.affectedRows > 0) {
        return;
      } else throw new Error("There was a problem while updating the member");
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  }

  async getMemberToken(memberId: number) {
    try {
      const [selectedTokens] = await this.db
        .select()
        .from(memberTokens)
        .where(eq(members.id, memberId));
      if (!selectedTokens) throw new Error("Token not found");
      return selectedTokens;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  }
}
