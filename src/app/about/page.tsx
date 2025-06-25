import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About BulkEase - Community Group Buying Platform | Revolutionary Shopping Experience",
  description:
    "Discover how BulkEase transforms shopping through community-powered group buying. Our hook-and-capture model creates better prices, stronger communities, and smarter purchasing decisions.",
  keywords:
    "group buying, community shopping, bulk purchasing, collective buying power, better prices, BulkEase platform",
  openGraph: {
    title: "About BulkEase - Revolutionary Community Group Buying",
    description:
      "Learn how our innovative hook-and-capture model transforms shopping through collective buying power.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Video Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        >
          <source src="/videos/video_temp.mp4" type="video/mp4" />
        </video>
        {/* Fallback Image
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-gray-900"
          style={{
            backgroundImage: "url(/images/hero-fallback.jpg)",
            filter: "brightness(0.4)",
          }}
        /> */}
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              About BulkEase
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
              Transforming commerce through intelligent community-driven group
              buying
            </p>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-70">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Company Overview
            </h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto mb-8" />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-8">
            <p className="text-xl mb-8">
              BulkEase represents a paradigm shift in commercial procurement,
              leveraging collective purchasing power to deliver unprecedented
              value to communities worldwide. Our proprietary methodology
              transforms traditional market dynamics through strategic
              collaboration and intelligent demand aggregation.
            </p>

            <p className="mb-8">
              Founded on the principle that collective action yields superior
              outcomes, BulkEase has established itself as the premier platform
              for community-driven group buying. We serve as the bridge between
              individual consumers and wholesale markets, creating opportunities
              that were previously accessible only to large-scale buyers.
            </p>

            <p>
              Our commitment to transparency, efficiency, and community
              empowerment drives every aspect of our operations. Through
              rigorous market analysis and strategic partnerships, we
              consistently deliver cost savings of 20-50% while maintaining the
              highest standards of product quality and service excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <div className="w-16 h-1 bg-gray-900 mb-6" />
              <p className="text-lg text-gray-700 leading-8">
                To democratize access to wholesale pricing through innovative
                community-driven purchasing solutions, empowering individuals
                and organizations to achieve superior economic outcomes while
                fostering sustainable commercial relationships.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h3>
              <div className="w-16 h-1 bg-gray-900 mb-6" />
              <p className="text-lg text-gray-700 leading-8">
                To establish the global standard for collaborative commerce,
                creating a world where collective purchasing power eliminates
                traditional barriers to value, enabling communities to access
                premium products and services at unprecedented prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Strategic Framework
            </h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our systematic approach to market transformation through the
              proprietary hook-and-capture methodology
            </p>
          </div>

          <div className="space-y-16">
            {/* Phase 1 */}
            <div className="border-l-4 border-gray-900 pl-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-400 mr-4">
                  01
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  Strategic Market Engagement
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-8">
                We identify and engage target communities through comprehensive
                market analysis, demonstrating the transformative potential of
                collective purchasing power and establishing initial interest in
                collaborative procurement opportunities.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="border-l-4 border-gray-900 pl-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-400 mr-4">
                  02
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  Demand Capture & Aggregation
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-8">
                Through strategic community engagement and validated interest
                assessment, we systematically capture and aggregate authentic
                market demand, creating substantial purchasing volumes that
                enable advantageous supplier negotiations.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="border-l-4 border-gray-900 pl-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-400 mr-4">
                  03
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  Hierarchical Optimization
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-8">
                Leveraging aggregated demand intelligence, we implement
                sophisticated selling hierarchies that optimize supply chain
                efficiency, pricing structures, and value distribution across
                our entire ecosystem of participants.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="border-l-4 border-gray-900 pl-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-400 mr-4">
                  04
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  Value Realization & Distribution
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-8">
                Community members realize substantial cost savings, exclusive
                market access, and priority product availability while
                participating in a transparent, efficient, and sustainable
                collaborative commerce ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Core Values
            </h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Transparency
              </h3>
              <p className="text-gray-700 leading-7">
                Complete visibility into pricing structures, supplier
                relationships, and operational processes ensures informed
                decision-making for all community members.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Integrity
              </h3>
              <p className="text-gray-700 leading-7">
                Unwavering commitment to ethical business practices, honest
                communication, and fair value distribution across all
                stakeholder relationships.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-700 leading-7">
                Continuous advancement of collaborative commerce methodologies
                through technology integration and strategic process
                optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Leadership Statement
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-12" />

          <blockquote className="text-xl text-gray-700 leading-9 italic mb-8">
            "BulkEase represents more than a platform—it embodies a fundamental
            shift toward collaborative commerce that benefits entire
            communities. Our commitment extends beyond cost savings to creating
            sustainable economic opportunities that empower individuals and
            organizations to achieve their goals through collective action."
          </blockquote>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-lg font-semibold text-gray-900">
              Executive Leadership Team
            </p>
            <p className="text-gray-600">BulkEase Corporation</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
