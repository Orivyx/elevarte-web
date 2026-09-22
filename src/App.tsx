import { Header } from "./components/Header";
import { Cinema } from "./sections/Cinema";

import { Studio } from "./sections/Studio";
import { Services } from "./sections/Services";
import { Testimonials } from "./sections/Testimonials";
import { Contact } from "./sections/Contact";
import { ScrollProgress } from "./components/ScrollProgress";
export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Cinema />

        <Studio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <ScrollProgress />
    </>
  );
}
