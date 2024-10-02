import { redirect } from "next/navigation";

import {
  fetchProfessorById,
  getUserByEmail,
  getUserSession,
} from "@/src/lib/actions";
import PaymentSheet from "@/src/components/payments/payment-sheet";
import { IMember, IProfessor } from "@/src/lib/definitions";

async function PaymentPage({ params }: { params: { id: string } }) {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }

  const userEmail = session.email;
  const profId = Number(params.id);
  const user = (await getUserByEmail(userEmail)) as IMember;
  const professor = (await fetchProfessorById(profId)) as IProfessor;

  return <PaymentSheet user={user} professorId={profId} />;
}

export default PaymentPage;
