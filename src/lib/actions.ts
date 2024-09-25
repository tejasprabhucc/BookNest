"use server";
import { db } from "@/src/drizzle/index";
import {
  FilterOptions,
  IBook,
  IBookBase,
  IMember,
  IMemberBase,
  IPageRequest,
  IProfessor,
  ITransaction,
  ITransactionBase,
  Role,
  SortOptions,
} from "@/src/lib/definitions";
import { auth, signIn } from "@/src/auth";
import { AuthError, User } from "next-auth";
import { redirect } from "next/navigation";
import { BookRepository } from "@/src/repositories/book.repository";
import { MemberRepository } from "@/src/repositories/member.repository";
import { z } from "zod";
import {
  ITransactionDetails,
  TransactionRepository,
} from "@/src/repositories/transaction.repository";
import { ProfessorRepository } from "../repositories/professor.repository";
import { AppEnvs } from "./read-env";

const bookRepo = new BookRepository(db);
const memberRepo = new MemberRepository(db);
const transactionRepo = new TransactionRepository(db);
const professorRepo = new ProfessorRepository(db);

export type State = {
  message?: string | null;
  loading: boolean;
};

export async function getUserSession() {
  const session = await auth();
  const user = session?.user;
  const email = user?.email;

  try {
    const userDetails = await memberRepo.getByEmail(email as string);
    if (!userDetails) {
      throw new Error("User details not be found");
    }
    return user;
  } catch (error) {
    console.error("Error finding details of user", error);
  }
}

export async function createUser(data: IMemberBase) {
  try {
    const existingUser = await memberRepo.getByEmail(data.email);
    if (existingUser) {
      return { message: "This email is already registered." };
    }
    const result = await memberRepo.create(data);
    if (result) {
      return { message: "Registered successfully!" };
    }
    return { message: "Registeration failed!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await memberRepo.getByEmail(email);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function getUserTransactionSummary(id: number) {
  console.log("ID: ", id);
  try {
    const allTransactions = await transactionRepo.listTransactionDetails(
      {
        offset: 0,
        limit: 10,
      },
      BigInt(id),
      { sortBy: "id", sortOrder: "desc" }
    );
    if (!allTransactions) {
      return null;
    }
    const summary = allTransactions.items.reduce(
      (acc, transaction) => {
        if (transaction.bookStatus === "issued") {
          acc.borrowedBooks++;
          acc.booksDue++;
        } else if (transaction.bookStatus === "pending") {
          acc.pendingRequest++;
        } else if (transaction.bookStatus === "returned") {
          acc.returnedBooks++;
        }
        return acc;
      },
      { borrowedBooks: 0, pendingRequest: 0, booksDue: 0, returnedBooks: 0 }
    );
    return summary;
  } catch (err) {
    console.log((err as Error).message);
    return null;
  }
}

export async function getUserById(id: number) {
  try {
    return await memberRepo.getById(id);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function fetchMembers(params: IPageRequest) {
  try {
    return await memberRepo.list(params);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function createMember(prevState: any, formData: FormData) {
  try {
    const data: Omit<IMember, "id"> = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as Role,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      image: formData.get("image") as string,
    };

    const createdMember = await memberRepo.create(data);
    if (!createdMember) {
      return { message: "Failed to create member." };
    }

    return { message: "Member created successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function deleteMember(id: number) {
  try {
    const deleted = await memberRepo.delete(id);
    if (!deleted) {
      return { message: "Failed to delete the member." };
    }
    return { message: "Member deleted successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function editMember(prevState: any, formData: FormData) {
  try {
    const id = Number(formData.get("id"));
    const oldData = await memberRepo.getById(id);
    const data: IMemberBase = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      password: oldData.password,
      role: oldData.role,
      image: (formData.get("image") as string) || oldData.image,
    };
    const response = await memberRepo.update(id, data);
    if (!response) {
      return { message: "Failed to update the profile." };
    }
    return { message: "Profile updated successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function editProfilePicture(email: string, imageURL: string) {
  try {
    const userData = (await getUserByEmail(email)) as IMember;
    const newData: IMember = { ...userData, image: imageURL };
    const response = await memberRepo.update(userData.id, newData);
    if (!response) {
      return { message: "Failed to update the profile." };
    }
    return { message: "Profile updated successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function createBook(prevState: any, formData: FormData) {
  try {
    const data: IBookBase = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      publisher: formData.get("publisher") as string,
      genre: formData.get("genre") as string,
      isbnNo: formData.get("isbnNo") as string,
      numOfPages: Number(formData.get("numOfPages")),
      totalNumOfCopies: Number(formData.get("totalNumOfCopies")),
      coverImage: formData.get("image") as string,
      price: Number(formData.get("price")),
    };

    const createdBook = await bookRepo.create(data);
    if (!createdBook) {
      return { message: "Failed to create book." };
    }

    return { message: "Book created successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function fetchBooks(
  params: IPageRequest,
  filterOptions?: FilterOptions<IBookBase>,
  sortOptions?: SortOptions<IBook>
) {
  try {
    return await bookRepo.list(params, sortOptions);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function getBookById(id: string) {
  try {
    const bookId = Number(id);
    return await bookRepo.getById(bookId);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function deleteBook(id: number) {
  try {
    const deleted = await bookRepo.delete(id);
    if (!deleted) {
      return { message: "Failed to delete the book." };
    }
    return { message: "Book deleted successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function editBook(prevState: any, formData: FormData) {
  try {
    const data: IBookBase = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      publisher: formData.get("publisher") as string,
      genre: formData.get("genre") as string,
      isbnNo: formData.get("isbnNo") as string,
      numOfPages: Number(formData.get("numOfPages")),
      totalNumOfCopies: Number(formData.get("totalNumOfCopies")),
      coverImage: formData.get("image") as string,
      price: Number(formData.get("price")),
    };

    const id = Number(formData.get("id"));
    const availableNumOfCopies = Number(formData.get("availableNumOfCopies"));

    const response = await bookRepo.update(id, data, availableNumOfCopies);
    if (!response) {
      return { message: "Failed to update the book." };
    }

    return { message: "Book updated successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function fetchTransactions(
  params: IPageRequest,
  sortOptions: SortOptions<ITransaction>,
  filterOptions?: FilterOptions<ITransaction>
) {
  try {
    return await transactionRepo.listTransactionDetails(
      params,
      undefined,
      sortOptions,
      filterOptions
    );
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function fetchDueTransactions(
  params: IPageRequest,
  memberId?: number
) {
  try {
    if (memberId) {
      return await transactionRepo.getDueBooks(params, BigInt(memberId));
    } else {
      return await transactionRepo.getDueBooks(params);
    }
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function requestBook(data: ITransactionBase) {
  try {
    const result = await transactionRepo.create(data);
    if (!result) {
      return { message: "Failed to request book." };
    }

    return { message: "Book requested successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function returnBook(id: number) {
  try {
    const result = await transactionRepo.returnBook(id);
    if (!result) {
      return { message: "Failed to return the book." };
    }

    return { message: "Book returned successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function rejectBookRequest(id: number) {
  try {
    const transaction = await transactionRepo.getById(id);
    const updatedData: ITransaction = {
      ...transaction,
      bookStatus: "rejected",
    };
    const result = await transactionRepo.update(id, updatedData);

    if (!result) {
      return { message: "Failed to reject the book request." };
    }

    return { message: "Book request rejected!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function acceptBookRequest(id: number) {
  try {
    const result = await transactionRepo.issueBook(id);
    console.log(result);

    if (!result) {
      return { message: "Failed to accept book request." };
    }

    return { message: "Book request accepted." };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function deleteTransaction(id: number) {
  try {
    const deleted = await transactionRepo.delete(id);
    if (!deleted) {
      return { message: "Failed to delete the transaction." };
    }
    return { message: "transaction deleted successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function fetchRequestsByMember(
  params: IPageRequest,
  memberId: bigint,
  sortOptions?: SortOptions<ITransaction>
) {
  try {
    return await transactionRepo.listTransactionDetails(
      params,
      memberId,
      sortOptions
    );
  } catch (err) {
    console.log(err);
    return { message: (err as Error).message };
  }
}

export async function createProfessor(prevState: any, formData: FormData) {
  try {
    const data: Omit<IProfessor, "id"> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      department: formData.get("department") as string,
      shortBio: formData.get("shortBio") as string,
      calendlyLink: formData.get("calendlyLink") as string,
    };

    const createdMember = await professorRepo.create(data);
    if (!createdMember) {
      return { message: "Failed to create professor." };
    }

    return { message: "Professor created successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function fetchProfessors(params: IPageRequest) {
  try {
    return await professorRepo.list(params);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function fetchProfessorById(id: number) {
  try {
    return await professorRepo.getById(id);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function deleteProfessor(id: number) {
  try {
    const deleted = await professorRepo.delete(id);
    if (!deleted) {
      return { message: "Failed to delete the professor." };
    }
    return { message: "Professor deleted successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    const user = (await getUserByEmail(email as string)) as IMember;
    console.log(user);
    if (user.role === "admin") {
      redirect("/admin/books");
    }
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function getOrganizationUri() {
  try {
    const response = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AppEnvs.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.resource.current_organization;
  } catch (error) {
    console.error("Error fetching organization URI", error);
    throw error;
  }
}

export async function getScheduledEvents() {
  try {
    const orgUri = await getOrganizationUri();
    const url = `https://api.calendly.com/scheduled_events?organization=${orgUri}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AppEnvs.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.collection;
  } catch (error) {
    console.error("Error fetching user URI", error);
    throw error;
  }
}

export async function getUsersAppointments(email: string) {
  try {
    const orgUri = await getOrganizationUri();
    const url = `https://api.calendly.com/scheduled_events?organization=${orgUri}&invitee_email=${email}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AppEnvs.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.collection;
    // const events = data.collection;

    // const eventsDetails = await Promise.all(
    //   events.map(async (event: any) => {
    //     const meetLink = event.location?.join_url || "No Meet link";
    //     // Extract event UUID from the event URI
    //     const eventUUID = event.uri.split("/").pop();
    //     // Fetch invitee details for each event
    //     const invitees = await getInviteeDetails(eventUUID);
    //     // Fetch organizer details from event memberships
    //     const organizers = event.event_memberships.map((membership: any) => ({
    //       name: membership.user_name,
    //       email: membership.user_email,
    //     }));
    //     return {
    //       event: event.name,
    //       start_time: event.start_time,
    //       end_time: event.end_time,
    //       meetLink: meetLink,
    //       organizers, // Organizers info
    //       invitees: invitees.map((invitee: any) => ({
    //         name: invitee.name,
    //         email: invitee.email,
    //       })),
    //     };
    //   })
    // );
  } catch (error) {
    console.error("Error fetching user URI", (error as Error).message);
    throw error;
  }
}

// export async function getInviteeDetails(event_uuid: string) {
//   try {
//     const response = await fetch(
//       `https://api.calendly.com/scheduled_events/${event_uuid}/invitees`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${AppEnvs.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log("Error fetching invitees:", errorText);
//       throw new Error(`Error fetching invitees: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.collection; // List of invitees
//   } catch (error) {
//     console.error("Error fetching invitee details", error);
//     throw error;
//   }
// }
