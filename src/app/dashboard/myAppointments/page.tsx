import {
  getUserByEmail,
  getUsersAppointments,
  getUserSession,
} from "@/src/lib/actions";
import { redirect } from "next/navigation";
import MyAppointments from "@/src/components/appointment/myAppointments";
import { IMember } from "@/src/lib/definitions";

const AppointmentsPage = async ({
  searchParams,
}: {
  searchParams?: {
    startDate?: string;
    endDate?: string;
  };
}) => {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }
  const email = session.email;
  const user = (await getUserByEmail(email)) as IMember;
  const appointments = await getUsersAppointments(email);

  return <MyAppointments appointments={appointments} user={user} />;
};

export default AppointmentsPage;
