import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import {
  IRepository,
  IMemberBase,
  IMember,
  IPagedResponse,
  IPageRequest,
  Role,
  SortOptions,
  IProfessor,
  IProfessorBase,
} from "../lib/definitions";
import { professors } from "../drizzle/schema";
import { count, eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { ProfessorSchema } from "../models/professors.schema";

export class ProfessorRepository {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IProfessorBase): Promise<IProfessor | undefined> {
    const validatedData = { ...ProfessorSchema.parse(data) };

    const newProfessor: IProfessorBase = {
      ...validatedData,
    };
    try {
      const [result] = await this.db
        .insert(professors)
        .values(newProfessor)
        .returning({ id: professors.id });

      return await this.getById(result.id);
    } catch (error) {
      throw new Error(`Error creating member: ${(error as Error).message}`);
    }
  }

  async update(id: number, data: IProfessor): Promise<IProfessor | undefined> {
    const professorToUpdate = await this.getById(id);
    if (!professorToUpdate) {
      throw new Error("Professor not found");
    }

    const validatedData = ProfessorSchema.parse(data);
    const updatedProfessor: IProfessor = {
      ...professorToUpdate,
      ...validatedData,
    };

    try {
      const result = await this.db
        .update(professors)
        .set(updatedProfessor)
        .where(eq(professors.id, id))
        .execute();
      if (result.rowCount) {
        return await this.getById(id);
      } else {
        throw new Error("Could not update professor");
      }
    } catch (error) {
      throw new Error("Could not update professor");
    }
  }

  async delete(id: number): Promise<IProfessor | undefined> {
    console.log("Prof ID: ", id);
    const professorToDelete = await this.getById(id);
    console.log("Prof: ", professorToDelete);
    if (!professorToDelete) {
      throw new Error("Member not found");
    }

    try {
      const result = await this.db
        .delete(professors)
        .where(eq(professors.id, id))
        .execute();
      if (result.rowCount) {
        return professorToDelete;
      } else {
        throw new Error(`Professor deletion failed`);
      }
    } catch (error) {
      throw new Error(`Professor deletion failed`);
    }
  }

  async getById(id: number): Promise<IProfessor | undefined> {
    try {
      const [professor] = (await this.db
        .select()
        .from(professors)
        .where(eq(professors.id, id))
        .limit(1)) as IProfessor[];

      if (!professor) {
        throw new Error("Member not found");
      }
      return professor;
    } catch (error) {
      throw new Error(`Member not found`);
    }
  }

  async list(
    params: IPageRequest
  ): Promise<IPagedResponse<IProfessor> | undefined> {
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${professors.name} ILIKE ${search} OR ${professors.email} ILIKE ${search}`;
    }

    try {
      const matchedProfessors = (await this.db
        .select()
        .from(professors)
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)) as IProfessor[];

      if (matchedProfessors.length > 0) {
        const [totalMatchedProfessors] = await this.db
          .select({ count: count() })
          .from(professors)
          .where(searchWhereClause);

        return {
          items: matchedProfessors,
          pagination: {
            offset: params.offset,
            limit: params.limit,
            total: totalMatchedProfessors.count,
          },
        };
      } else {
        throw new Error("No professors found matching the criteria");
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async getByEmail(email: string): Promise<IProfessor | null> {
    try {
      if (!this.db) {
        return null;
      }
      const [selectedProf] = await this.db
        .select()
        .from(professors)
        .where(eq(professors.email, email));
      if (!selectedProf) return null;
      return selectedProf as IProfessor;
    } catch (error) {
      throw error;
    }
  }
}
