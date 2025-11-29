"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CornerDownLeft } from 'lucide-react';
import Lenis from "@studio-freight/lenis";
import Copy from "../components/Copy";
const sections = [
  { id: "data", title: "What data do we collect?" },
  { id: "use", title: "How we use your data" },
  { id: "cookies", title: "Cookies" },
  { id: "security", title: "Security" },
  { id: "retention", title: "Shelf life" },
  { id: "rights", title: "Your rights" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPolicy() {
  const router = useRouter();
  const [activeId, setActiveId] = useState(null);
const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const l = new Lenis({ smooth: true });
    setLenis(l);

    function raf(time) {
      l.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => l.destroy();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    
    <section className="relative text-black">
           <header className="flex items-center justify-center gap-4 p-5">
          <CornerDownLeft onClick={() => router.push('/')} className="cursor-pointer hover:scale-110 transition-transform mr-auto" />
          <h1 className="text-5xl font-bold mr-auto">Privacy Policy</h1>
        </header>
        <div className='flex'>
      {/* Main Content */}
      <div className="flex-1 px-8 py-10 space-y-20">
     

        <p className="font-[Satoshi] font-bold">Last Updated: 30/07/2025</p>

        {sections.map((section) => (
          <div key={section.id} id={section.id} className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-semibold">{section.title}</h2>
            <div className="font-[Satoshi] text-[18px] max-w-4xl leading-relaxed">
              {getSectionContent(section.id)}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Menu */}
      <aside className="hidden md:block sticky top-20 h-fit w-64 px-6 pt-10">
        <ul className="space-y-4 border-l border-gray-300 pl-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block text-sm font-medium transition-all ${
                  activeId === section.id ? 'text-black font-bold border-l-4 border-black pl-2' : 'text-gray-400 hover:text-black'
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      </div>
    </section>
  );
}

function getSectionContent(id) {
  switch (id) {
    case "data":
      return (
        <>
          <Copy><p>
            We collect personal data you voluntarily provide when you interact
            with our services. This includes your name, email address, and any
            information you enter into contact or newsletter forms.
          </p>
          <p>
            Additionally, we use analytical tools like Google Analytics to
            collect anonymous usage statistics such as pages visited, time
            spent on the site, and referral sources. No sensitive or financial
            data is collected.
          </p></Copy>
        </>
      );
    case "use":
      return (
        <>
          <Copy><p>
            We use your data solely for purposes that improve your experience
            and communication. For instance, if you fill in a form, we may use
            your email to respond.
          </p>
          <p>
            We analyze aggregated traffic data to understand user behavior and
            optimize the structure and content of our website. Your data is
            never sold or shared with third parties.
          </p></Copy>
        </>
      );
    case "cookies":
      return (
        <>
          <Copy><p>
            Cookies are used to enhance your browsing experience. Functional
            cookies ensure smooth navigation and remember your preferences.
          </p>
          <p>
            Analytical cookies help us gather statistics. You can refuse cookies
            at any time through your browser settings, though this may impact
            certain features.
          </p></Copy>
        </>
      );
    case "security":
      return (
        <>
          <Copy><p>
            We apply security best practices such as HTTPS encryption, firewall
            protections, and regular audits to ensure your data remains safe
            from unauthorized access or exposure.
          </p>
          <p>We never store your data on publicly accessible platforms.</p></Copy>
        </>
      );
    case "retention":
      return (
        <>
          <Copy><p>
            Your personal data is stored only as long as necessary. Contact data
            is retained for a maximum of 12 months after the last communication
            unless legal obligations require otherwise.
          </p>
          <p>
            Analytical data is anonymized and used indefinitely for statistical
            purposes.
          </p></Copy>
        </>
      );
    case "rights":
      return (
        <>
          <Copy><p>
            In accordance with the General Data Protection Regulation (GDPR),
            you have several rights concerning your personal data. You may:
          </p>
          <ul className="list-disc pl-5">
            <li>Request access to the data we hold about you.</li>
            <li>Ask for corrections if the data is inaccurate or outdated.</li>
            <li>Request the deletion of your data under specific circumstances.</li>
            <li>
              Withdraw your consent at any time, particularly regarding cookies
              or marketing communication.
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights or if you have concerns about your
            data, you may contact us directly at {" "}
            <strong>thefabstudio2@gmail.com</strong>. We are committed to
            addressing your request in a timely and respectful manner.
          </p></Copy>
        </>
      );
    case "contact":
      return (
        <>
          <Copy><p>
            If you have any questions, concerns, or would like more information
            about our privacy practices, feel free to reach out.
          </p>
          <p>
            We are fully committed to maintaining open and honest
            communication. Please write to us at: {" "}
            <strong>thefabstudio2@gmail.com</strong> and we will do our best to
            respond promptly.
          </p></Copy>
        </>
      );
    default:
      return null;
  }
}

