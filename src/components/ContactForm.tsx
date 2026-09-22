import Magnet from "./reactbits/Magnet";
import { useRef, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

export function ContactForm() {
  const { t } = useTranslation();
  const message = useRef<HTMLInputElement>(null);

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) || "").trim();
    if (message.current) {
      message.current.value = t("form.message", {
        name: field("clientName"),
        email: field("clientEmail"),
        brand: field("brand") || "—",
        project: field("project"),
      });
    }
    // Only the composed message is sent to WhatsApp.
    for (const name of ["clientName", "clientEmail", "brand", "project"]) {
      const control = event.currentTarget.elements.namedItem(name) as
        HTMLInputElement | HTMLTextAreaElement;
      control.removeAttribute("name");
      queueMicrotask(() => control.setAttribute("name", name));
    }
  }
  return (
    <form
      className="contact-form relative z-2 mt-[45px] mb-[60px] w-full min-w-0 text-left md:mt-0 md:mb-20"
      action="https://wa.me/5511981940728"
      method="get"
      target="_blank"
      rel="noopener noreferrer"
      onSubmit={prepareMessage}
    >
      <p className="contact-form-intro mb-[30px] max-w-[480px] text-base leading-[1.6] text-[#d0d7cf] md:mb-11 md:text-lg">
        {t("form.intro")}
      </p>
      <div className="contact-fields grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-[26px] md:gap-y-[30px]">
        <label
          className="flex min-w-0 flex-col gap-3.5 text-xs tracking-[.06em] text-[#cbd4ce]"
          htmlFor="client-name"
        >
          <span>{t("form.name")}</span>
          <input
            className="w-full rounded-none border-0 border-b border-white/22 bg-transparent pt-3 pb-[18px] font-sans text-[17px] leading-normal tracking-normal text-[#f2f4ee] transition-colors placeholder:text-[#8e9a92] placeholder:opacity-100 focus:border-[#61ddbd] focus:outline-2 focus:outline-offset-6 focus:outline-[#61ddbd]"
            id="client-name"
            name="clientName"
            autoComplete="name"
            required
            pattern=".*\S.*"
            maxLength={100}
            placeholder={t("form.namePlaceholder")}
          />
        </label>
        <label
          className="flex min-w-0 flex-col gap-3.5 text-xs tracking-[.06em] text-[#cbd4ce]"
          htmlFor="client-email"
        >
          <span>{t("form.email")}</span>
          <input
            className="w-full rounded-none border-0 border-b border-white/22 bg-transparent pt-3 pb-[18px] font-sans text-[17px] leading-normal tracking-normal text-[#f2f4ee] transition-colors placeholder:text-[#8e9a92] placeholder:opacity-100 focus:border-[#61ddbd] focus:outline-2 focus:outline-offset-6 focus:outline-[#61ddbd]"
            id="client-email"
            name="clientEmail"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            placeholder={t("form.emailPlaceholder")}
          />
        </label>
        <label
          className="contact-field-wide col-span-full flex min-w-0 flex-col gap-3.5 text-xs tracking-[.06em] text-[#cbd4ce]"
          htmlFor="client-brand"
        >
          <span>{t("form.brand")}</span>
          <input
            className="w-full rounded-none border-0 border-b border-white/22 bg-transparent pt-3 pb-[18px] font-sans text-[17px] leading-normal tracking-normal text-[#f2f4ee] transition-colors placeholder:text-[#8e9a92] placeholder:opacity-100 focus:border-[#61ddbd] focus:outline-2 focus:outline-offset-6 focus:outline-[#61ddbd]"
            id="client-brand"
            name="brand"
            autoComplete="organization"
            maxLength={160}
            placeholder={t("form.brandPlaceholder")}
          />
        </label>
        <label
          className="contact-field-wide col-span-full flex min-w-0 flex-col gap-3.5 text-xs tracking-[.06em] text-[#cbd4ce]"
          htmlFor="client-project"
        >
          <span>{t("form.project")}</span>
          <textarea
            className="w-full rounded-none border-0 border-b border-white/22 bg-transparent pt-3 pb-[18px] font-sans text-[17px] leading-normal tracking-normal text-[#f2f4ee] transition-colors placeholder:text-[#8e9a92] placeholder:opacity-100 focus:border-[#61ddbd] focus:outline-2 focus:outline-offset-6 focus:outline-[#61ddbd] min-h-[135px] resize-y"
            id="client-project"
            name="project"
            required
            minLength={10}
            maxLength={2500}
            rows={4}
            placeholder={t("form.projectPlaceholder")}
          />
        </label>
      </div>
      <div className="contact-form-actions mt-9 flex flex-col items-stretch justify-between gap-6">
        <p
          className="m-0 max-w-[350px] text-xs leading-[1.7] text-[#a5b2a9]"
          id="contact-send-note"
        >
          {t("form.note")}
        </p>
        <Magnet
          padding={35}
          magnetStrength={7}
          wrapperClassName="contact-magnet w-full shrink-0"
        >
          <button
            className="text-cta flex w-full shrink-0 cursor-pointer items-center justify-between gap-12 rounded-[2px] border-0 bg-[#b8e9ce] px-[22px] py-[19px] text-[11px] tracking-[.05em] text-[#08251b] transition-colors hover:bg-[#d7fbe6] [&>span]:text-[27px]"
            type="submit"
            aria-describedby="contact-send-note"
          >
            {t("form.submit")}
          </button>
        </Magnet>
      </div>
      <input ref={message} type="hidden" name="text" />
    </form>
  );
}
