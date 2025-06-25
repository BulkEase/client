import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact BulkEase - Professional Group Buying Solutions | Get in Touch",
  description:
    "Connect with BulkEase for enterprise group buying solutions, strategic partnerships, and professional procurement support. Reach our expert team for business inquiries.",
  keywords:
    "contact bulkease, enterprise group buying, professional procurement, business partnerships, bulk purchasing solutions",
  openGraph: {
    title: "Contact BulkEase - Professional Group Buying Solutions",
    description:
      "Connect with our expert team for enterprise group buying solutions and strategic partnerships.",
    type: "website",
  },
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Contact BulkEase
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Connect with our professional team for enterprise solutions,
            strategic partnerships, and comprehensive support for your group
            buying initiatives.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-16">
          {/* Left Column - Contact Information */}
          <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Business Inquiries */}
            <div className="border border-gray-300 bg-gray-50 p-6">
              <div className="border-l-4 border-green-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                  Business Inquiries
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  Enterprise partnerships, strategic collaborations, and bulk
                  procurement solutions.
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Email
                    </span>
                    <p className="text-base font-semibold text-gray-900">
                      business@bulkease.com
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Response Time
                    </span>
                    <p className="text-gray-700 text-sm">
                      Within 4 business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Support */}
            <div className="border border-gray-300 bg-white p-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                  Technical Support
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  Platform assistance, account management, and technical
                  troubleshooting.
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Phone
                    </span>
                    <p className="text-base font-semibold text-gray-900">
                      +91 98765 43210
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Availability
                    </span>
                    <p className="text-gray-700 text-sm">
                      Mon-Fri, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="border border-gray-300 bg-gray-50 p-6">
              <div className="border-l-4 border-green-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                  Corporate Office
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  Visit for in-person consultations and business meetings.
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Address
                    </span>
                    <p className="text-base font-semibold text-gray-900 leading-tight">
                      Tower A, Business District
                      <br />
                      Mumbai, Maharashtra 400001
                      <br />
                      India
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Office Hours
                    </span>
                    <p className="text-gray-700 text-sm">
                      Mon-Fri, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Networks & CTA */}
          <div className="xl:col-span-1 space-y-8">
            {/* Professional Networks */}
            <div className="bg-gray-50 border border-gray-300 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-tight">
                Professional Networks
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">in</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      LinkedIn
                    </h4>
                    <p className="text-gray-600 text-xs">@bulkease-official</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">ig</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      Instagram
                    </h4>
                    <p className="text-gray-600 text-xs">@bulkease.official</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-600 text-white p-6">
              <h3 className="text-lg font-bold mb-3">Ready to Transform?</h3>
              <p className="text-green-100 mb-4 text-sm leading-relaxed">
                Join organizations revolutionizing their procurement through
                strategic collaboration.
              </p>
              <button className="w-full bg-white text-green-600 py-3 px-4 text-sm font-semibold hover:bg-gray-100 transition-colors duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Information */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Response Time
              </h4>
              <p className="text-gray-600 text-sm">
                Average 2 hours for business inquiries
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Support Coverage
              </h4>
              <p className="text-gray-600 text-sm">
                Monday to Friday, 9 AM - 6 PM IST
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
              <p className="text-gray-600 text-sm">
                English, Hindi, Regional languages
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Enterprise Support
              </h4>
              <p className="text-gray-600 text-sm">
                Dedicated account managers available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
