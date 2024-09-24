import { useTranslations } from "next-intl";
import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { BookOpen, Clock, RefreshCw } from "lucide-react";

const Features = () => {
  const t = useTranslations("LandingPage");
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="h-12 w-12 text-primary" />}
            title={t("features.card1.title")}
            description={t("features.card3.description")}
          />
          <FeatureCard
            icon={<Clock className="h-12 w-12 text-primary" />}
            title={t("features.card2.title")}
            description={t("features.card3.description")}
          />
          <FeatureCard
            icon={<RefreshCw className="h-12 w-12 text-primary" />}
            title={t("features.card3.title")}
            description={t("features.card3.description")}
          />
        </div>
      </div>
    </section>
  );
};

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: any;
  description: any;
}) {
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center text-center p-6">
        {icon}
        <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export default Features;
