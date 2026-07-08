import { contactUsMetadata } from "@/lib/seo/contact-pages-seo";
import ContactUsClient from "./ContactUsClient";

export const generateMetadata = contactUsMetadata;

export default function ContactUsPage() {
  return <ContactUsClient />;
}
