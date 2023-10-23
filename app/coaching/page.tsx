
interface ServiceSectionProps {
  title: string;
  description: string;
}

const renderServiceSection = ({ title, description }: ServiceSectionProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const CoachingConsultingPage: React.FC = () => {

  // Define a helper function to render each service section

  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-blue-200 text-center py-16 mb-12">
        <h1 className="text-4xl font-bold mb-4">Empowering Startups to Achieve More</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">Providing strategic guidance and hands-on support to accelerate your growth and elevate your leadership.</p>
      </div>

      {/* Service Sections */}
      <div className="container mx-auto space-y-12">
      {renderServiceSection({
          title: "Startup Consulting",
          description:
            "Provide strategic advice and hands-on implementation help with business model development, go-to-market strategies, marketing, partnerships, funding, etc.",
        })}

    
        {renderServiceSection({
         title: "Growth Acceleration Programs",
          description:"Design multi-week/month programs to rapidly grow startups by focusing on traction, scaling systems, metrics analysis, team building, etc."
})}

    
        {renderServiceSection({
          title:"Leadership Development Training",
         description: "Offer workshops, seminars and coaching for founders, executives and managers to improve leadership skills like strategic thinking, decision-making, communication, delegation, conflict resolution."
})}

   {/* Leadership Development Training */}
   {renderServiceSection({
         title: "Leadership Development Training",
          description:  "Offer workshops, seminars and coaching for founders, executives and managers to improve leadership skills like strategic thinking, decision-making, communication, delegation, conflict resolution."
    } )}

        {/* Team Alignment Workshops */}
        {renderServiceSection({
          title:"Team Alignment Workshops",
          description:"Run sessions to align startup teams around vision, values, goals, roles and improve team dynamics."
         } )}

        {/* Executive Coaching */}
        {renderServiceSection({
          title:"Executive Coaching",
          description:"Provide 1-on-1 coaching to founders and executives on leadership growth, work-life balance, stress management, etc."
})}

        {/* Speaking and Workshops */}
        {renderServiceSection({
          title:"Speaking and Workshops",
          description:"Give motivational talks and interactive workshops at startup events, conferences, colleges on topics like personal development, entrepreneurship, leadership, etc."
})}

        {/* Startup Mentorship */}
        {renderServiceSection({
          title:"Startup Mentorship",
          description: "Provide mentorship and guidance to early-stage founders on validating ideas, building MVPs, raising funds, building teams, etc."
         } )}

      </div>
    </div>
  );
}

// Helper function to render a service section


// Export the CoachingConsultingPage component
export default CoachingConsultingPage;
