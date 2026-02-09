"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CornerDownLeft } from 'lucide-react';
import Lenis from "@studio-freight/lenis";
import Copy from "../components/Copy";
import { useLanguage } from '../../context/LanguageContext';

export default function PrivacyPolicy() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(null);
  const [lenis, setLenis] = useState(null);

  const sections = [
    { id: "data", title: t('privacyPolicy.sections.data.title') },
    { id: "use", title: t('privacyPolicy.sections.use.title') },
    { id: "cookies", title: t('privacyPolicy.sections.cookies.title') },
    { id: "security", title: t('privacyPolicy.sections.security.title') },
    { id: "retention", title: t('privacyPolicy.sections.retention.title') },
    { id: "rights", title: t('privacyPolicy.sections.rights.title') },
    { id: "contact", title: t('privacyPolicy.sections.contact.title') },
  ];

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

  const getSectionContent = (id) => {
    const section = t(`privacyPolicy.sections.${id}`);
    
    switch (id) {
      case "data":
      case "use":
      case "cookies":
      case "security":
      case "retention":
        return (
          <Copy>
            <p>{section.paragraph1}</p>
            <p>{section.paragraph2}</p>
          </Copy>
        );
      
      case "rights":
        return (
          <Copy>
            <p>{section.intro}</p>
            <ul className="list-disc pl-5">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">
              {section.conclusion} <strong>{section.email}</strong>. {section.commitment}
            </p>
          </Copy>
        );
      
      case "contact":
        return (
          <Copy>
            <p>{section.paragraph1}</p>
            <p>
              {section.paragraph2} <strong>{section.email}</strong> {section.response}
            </p>
          </Copy>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="relative text-black">
      <header className="flex items-center justify-center gap-4 p-5">
        <CornerDownLeft 
          onClick={() => router.push('/')} 
          className="cursor-pointer hover:scale-110 transition-transform mr-auto" 
        />
        <h1 className="text-5xl font-bold mr-auto">{t('privacyPolicy.title')}</h1>
      </header>
      
      <div className='flex'>
        <div className="flex-1 px-8 py-10 space-y-20">
          <p className="font-bold">{t('privacyPolicy.lastUpdated')}</p>

          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-semibold">{section.title}</h2>
              <div className="text-[18px] max-w-4xl leading-relaxed">
                {getSectionContent(section.id)}
              </div>
            </div>
          ))}
        </div>

        <aside className="hidden md:block sticky top-20 h-fit w-64 px-6 pt-10">
          <ul className="space-y-4 border-l border-gray-300 pl-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block text-sm font-medium transition-all ${
                    activeId === section.id 
                      ? 'text-black font-bold border-l-4 border-black pl-2' 
                      : 'text-gray-400 hover:text-black'
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