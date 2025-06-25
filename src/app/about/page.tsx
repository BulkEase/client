"use client";
import React from "react";

const About: React.FC = () => {
  return (
    <div
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background:
          "linear-gradient(135deg, #fafafa 0%, #f8f6f4 50%, #f4f2f0 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Texture overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 206, 84, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)
        `,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            textAlign: "center",
            padding: "6rem 0 4rem",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,246,244,0.9) 100%)",
            borderRadius: "0 0 2rem 2rem",
            marginBottom: "4rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to BulkEase
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#5a6c7d",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Revolutionizing shopping through community-powered group buying.
            Better prices, stronger communities, smarter purchasing.
          </p>
        </section>

        {/* Our Story Section */}
        <section
          style={{
            padding: "4rem 0",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#2c3e50",
              marginBottom: "2rem",
            }}
          >
            Our Story
          </h2>
          <div
            style={{
              background: "rgba(255,255,255,0.7)",
              padding: "3rem",
              borderRadius: "1.5rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <p
              style={{
                fontSize: "1.125rem",
                color: "#4a5568",
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              BulkEase was born from a simple yet powerful idea: what if
              communities could come together to unlock better prices through
              collective buying power? Our innovative hook-and-capture model
              transforms how people shop by creating a hierarchy of selling that
              benefits everyone involved.
            </p>
          </div>
        </section>

        {/* Process Flow Section */}
        <section
          style={{
            padding: "4rem 0",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#2c3e50",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            How We Make It Happen
          </h2>

          {/* Step 1: Hook */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4rem",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "3rem",
                borderRadius: "1.5rem",
                boxShadow: "0 15px 35px rgba(102, 126, 234, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  opacity: "0.9",
                }}
              >
                01
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                Hook: Attract & Engage
              </h3>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                  opacity: "0.95",
                }}
              >
                We showcase the incredible potential of group buying,
                demonstrating how community collaboration leads to significant
                savings and exclusive deals you can't find elsewhere.
              </p>
            </div>
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background:
                    "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
                  borderRadius: "50%",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  boxShadow: "0 15px 35px rgba(255, 234, 167, 0.4)",
                }}
              >
                🎯
              </div>
            </div>
          </div>

          {/* Step 2: Capture */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4rem",
              flexWrap: "wrap",
              gap: "2rem",
              flexDirection: "row-reverse",
            }}
          >
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                color: "white",
                padding: "3rem",
                borderRadius: "1.5rem",
                boxShadow: "0 15px 35px rgba(17, 153, 142, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  opacity: "0.9",
                }}
              >
                02
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                Capture: Build Demand
              </h3>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                  opacity: "0.95",
                }}
              >
                We capture genuine demand by encouraging community members to
                commit to purchases, creating a solid foundation for negotiating
                better deals with suppliers.
              </p>
            </div>
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background:
                    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                  borderRadius: "50%",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  boxShadow: "0 15px 35px rgba(168, 237, 234, 0.4)",
                }}
              >
                📊
              </div>
            </div>
          </div>

          {/* Step 3: Hierarchy */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4rem",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                color: "#2c3e50",
                padding: "3rem",
                borderRadius: "1.5rem",
                boxShadow: "0 15px 35px rgba(255, 154, 158, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  opacity: "0.8",
                }}
              >
                03
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                Hierarchy: Optimize Selling
              </h3>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                  opacity: "0.9",
                }}
              >
                Based on captured demand, we move through strategic selling
                stages, optimizing pricing structures and supply chain
                efficiency to maximize savings for everyone.
              </p>
            </div>
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background:
                    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                  borderRadius: "50%",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  boxShadow: "0 15px 35px rgba(255, 236, 210, 0.4)",
                }}
              >
                ⚡
              </div>
            </div>
          </div>

          {/* Step 4: Community Benefits */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4rem",
              flexWrap: "wrap",
              gap: "2rem",
              flexDirection: "row-reverse",
            }}
          >
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                padding: "3rem",
                borderRadius: "1.5rem",
                boxShadow: "0 15px 35px rgba(79, 172, 254, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  opacity: "0.9",
                }}
              >
                04
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                Deliver: Community Benefits
              </h3>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                  opacity: "0.95",
                }}
              >
                Members enjoy significantly lower prices, exclusive deals, early
                access to products, and the satisfaction of being part of a
                smart shopping community.
              </p>
            </div>
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background:
                    "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)",
                  borderRadius: "50%",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  boxShadow: "0 15px 35px rgba(150, 251, 196, 0.4)",
                }}
              >
                🎉
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          style={{
            padding: "4rem 0",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,246,244,0.9) 100%)",
            borderRadius: "2rem",
            margin: "4rem 0",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#2c3e50",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Why Join Our Community?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              padding: "0 2rem",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                💰
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#2c3e50",
                  marginBottom: "1rem",
                }}
              >
                Better Prices
              </h3>
              <p
                style={{
                  color: "#5a6c7d",
                  lineHeight: "1.6",
                }}
              >
                Save 20-50% on regular retail prices through our collective
                buying power
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                🤝
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#2c3e50",
                  marginBottom: "1rem",
                }}
              >
                Strong Community
              </h3>
              <p
                style={{
                  color: "#5a6c7d",
                  lineHeight: "1.6",
                }}
              >
                Connect with like-minded shoppers who value smart purchasing
                decisions
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                🎯
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#2c3e50",
                  marginBottom: "1rem",
                }}
              >
                Exclusive Access
              </h3>
              <p
                style={{
                  color: "#5a6c7d",
                  lineHeight: "1.6",
                }}
              >
                Get early access to deals and products not available to
                individual buyers
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          style={{
            textAlign: "center",
            padding: "4rem 0 6rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#2c3e50",
              marginBottom: "1.5rem",
            }}
          >
            Ready to Start Saving?
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#5a6c7d",
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            Join thousands of smart shoppers who have already discovered the
            power of community buying
          </p>
          <button
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "1rem 2.5rem",
              fontSize: "1.125rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(102, 126, 234, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(102, 126, 234, 0.4)";
            }}
          >
            Join BulkEase Today
          </button>
        </section>
      </div>
    </div>
  );
};

export default About;
