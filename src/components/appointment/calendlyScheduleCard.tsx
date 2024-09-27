"use client";
import { IMember, IProfessor } from "@/src/lib/definitions";
import React from "react";
import { InlineWidget } from "react-calendly";

const CalendlyScheduleCard = ({
  professor,
  user,
}: {
  professor: IProfessor;
  user: IMember;
}) => {
  return (
    <>
      {professor.calendlyLink ? (
        <InlineWidget
          url={professor.calendlyLink}
          styles={{
            height: "650px",
          }}
          prefill={{ name: user.name, email: user.email }}
        />
      ) : (
        <p>This professor is not available.</p>
      )}
    </>
  );
};

export default CalendlyScheduleCard;
