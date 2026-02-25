// app/sections/pricing/PricingContent.jsx (PAS de "use client")
"use client";
import {
  Squircle,
  Sparkles,
  ArrowLeftRight,
  RefreshCcw,
  Cone,
  Zap,
  RulerDimensionLine,
  LayoutTemplate,
  LineSquiggle,
  Scroll,
  GalleryVerticalEnd,
  Box,
  ScrollText,
  Flame,
  SquareMousePointer,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
export default function PricingContent() {
  const { locale, t } = useLanguage();
  const isFrench = locale === "fr";

  return (
    <>
     <h1
      className={`
        font-bold absolute whitespace-nowrap
        ${
          isFrench
            ? "text-8xl sm:left-auto -left-5 sm:top-10 sm:rotate-0 rotate-90"
            : "text-8xl sm:left-auto -left-5 sm:top-10 sm:rotate-0 rotate-90"
        }
      `}
    > {t("pricing.title")}
      </h1>

      <div className="bloc flex items-center justify-center sm:flex-row flex-col gap-5 sm:top-30 absolute text-black">
        {/* Starter Experience */}
        <div className="flex flex-col justify-center items-center gap-5">
        <div className="Starter flex items-center justify-between flex-col h-60 w-70 sm:h-100 sm:w-90 bg-transparent rounded-2xl backdrop-blur-sm backdrop-filter bg-opacity-10 border border-[#ffffff2c] ">
          <div className="head z-2 sm:h-20 w-full flex items-center justify-center">
            <h2 className="font-bold text-xl sm:text-2xl">
              {t("pricing.starter.name")}{" "}
            </h2>
          </div>

          <div className="list z-2 sm:h-60 w-full flex items-center justify-start pt-5 mb-auto flex-col gap-1 sm:gap-5 rounded-b-2xl">
            <div className="bg-[#ffffff2c] w-90/100 h-1 rounded-3xl absolute top-14 sm:top-20" />

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <Squircle size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.starter.features.0")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <Sparkles size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.starter.features.1")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <ArrowLeftRight size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.starter.features.2")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <RefreshCcw size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.starter.features.3")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <Cone size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.starter.features.4")}</p>
              </div>
            </div>
          </div>

        </div>
          <button className="btn hover:text-black text-white ease-in-out rounded-3xl w-40 sm:w-60 h-7 sm:h-11 bg-[#0f0f0f] hover:bg-[#b98d6b] flex justify-center items-center text-center mt-2 sm:mt-0 mb-0 sm:mb-5 ">
            {t("pricing.cta")}
          </button>
          </div>

        {/* Signature Experience */}
        <div className="flex flex-col justify-center items-center gap-5">
        <div className="Signature flex items-center justify-between flex-col h-60 w-70 sm:h-100 sm:w-90 bg-transparent rounded-2xl backdrop-blur-sm backdrop-filter bg-opacity-10 border border-[#ffffff2c] ">
          <div className="head z-2 sm:h-20 w-full flex items-center justify-center">
            <h2 className="font-bold text-xl sm:text-2xl">
              {t("pricing.signature.name")}
            </h2>
          </div>

          <div className="list z-2 mb-auto sm:h-60 w-full flex items-center justify-start pt-5 flex-col gap-1 sm:gap-5  rounded-b-2xl">
            <div className="bg-[#ffffff2c] w-90/100 h-1 rounded-3xl absolute top-14 sm:top-20" />

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <LayoutTemplate size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.signature.features.0")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <LineSquiggle size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.signature.features.1")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <Scroll size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.signature.features.2")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <GalleryVerticalEnd size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.signature.features.3")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <Zap size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.signature.features.4")}</p>
              </div>
            </div>
          </div>

        </div>
          <button className="btn hover:text-black text-white ease-in-out rounded-3xl w-40 sm:w-60 h-7 sm:h-11 bg-[#0f0f0f] hover:bg-[#b98d6b] flex justify-center items-center text-center mt-2 sm:mt-0 mb-0 sm:mb-5 ">
            {t("pricing.cta")}
          </button>
        </div>

        {/* Immersive Experience */}
        <div className="flex flex-col justify-center items-center gap-5">
        <div className="Immersive flex items-center justify-between flex-col h-60 w-70 sm:h-100 sm:w-90 bg-transparent rounded-2xl backdrop-blur-sm backdrop-filter bg-opacity-10 border border-[#ffffff2c] ">
          <div className="head z-2 sm:h-20 w-full flex items-center justify-center">
            <h2 className="font-bold text-xl sm:text-2xl text-nowrap">
              {t("pricing.immersive.name")}
            </h2>
          </div>

          <div className="list z-2 mb-auto sm:h-60 w-full flex items-center justify-start pt-5 flex-col gap-1 sm:gap-5 rounded-b-2xl">
            <div className="bg-[#ffffff2c] w-90/100 h-1 rounded-3xl absolute top-14 sm:top-20" />

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <RulerDimensionLine size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.immersive.features.0")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <Box size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.immersive.features.1")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <SquareMousePointer size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.immersive.features.2")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <Flame size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.immersive.features.3")}</p>
              </div>
            </div>

            <div className="element_list flex justify-start items-center gap-3 w-40 sm:w-60">
              <div className="btn hover:scale-[110%] ease-out rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7 bg-[#0f0f0f] border-gray-600 shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1)] text-[#b98d6b]">
                <ScrollText size={16} />
              </div>
              <div className="name text-xs sm:text-xl">
                <p>{t("pricing.immersive.features.4")}</p>
              </div>
            </div>
          </div>

        </div>
          <button className="btn hover:text-black text-white ease-in-out rounded-3xl w-40 sm:w-60 h-7 sm:h-11 bg-[#0f0f0f] hover:bg-[#b98d6b] flex justify-center items-center text-center mt-2 sm:mt-0 mb-0 sm:mb-5 ">
            {t("pricing.cta")}
          </button>
        </div>
      </div>
    </>
  );
}
