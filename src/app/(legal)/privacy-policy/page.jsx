import PageHeaderTwo from "@/components/globals/PageHeaderTwo";

export const metadata = {
  title: "Privacy Policy",
};

const PrivacyPage = () => {
  return (
    <div className="h-full top-[100px]">
      <PageHeaderTwo title="Privacy Policy" />
      <div className="container py-20 px-5 lg:px-20">
        <h1 className="font-semibold mb-10">Privacy Policy</h1>

        <p className="paragraph">
          At yayyu lifestyle, we respect and value your privacy. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you visit our website or make a purchase. By using
          our site, you agree to the terms outlined in this policy.
        </p>

        <p className="text-md mb-2 font-semibold">1. Information We Collect</p>
        <p className="paragraph">
          We collect information from you when you visit our website, place an
          order, subscribe to our newsletter, or interact with us in other ways.
          The types of information we collect may include:
        </p>
        <ul className="mb-7">
          <li className="li">
            Personal Identification Information: This may include your name,
            email address, mailing address, phone number, payment information,
            and other details necessary to process your order.
          </li>
          <li className="li">
            Non-Personal Identification Information: This may include your
            browser type, IP address, device information, and browsing history
            on our site.
          </li>
          <li className="li">
            Payment Information: When you make a purchase, we may collect your
            payment details, such as your credit/debit card information or other
            payment methods. Note: We do not store your full credit card
            information—payments are securely processed by trusted third-party
            payment gateways.
          </li>
          <li className="li">
            Cookies and Tracking Technologies: We use cookies to enhance your
            experience, analyze site traffic, and personalize content. Cookies
            are small files stored on your device that help us remember your
            preferences.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">
          2. How We Use Your Information
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          We use the information we collect for the following purposes:
        </p>
        <ul className="mb-7">
          <li className="li">
            Order Processing: To process and fulfill your orders, including
            shipping and delivery.
          </li>
          <li className="li">
            Customer Service: To respond to inquiries, process returns or
            exchanges, and provide support.
          </li>
          <li className="li">
            Marketing: To send you promotional emails, newsletters, and special
            offers (if you've subscribed to receive them). You can opt out of
            marketing emails at any time by clicking the “unsubscribe” link in
            our emails.
          </li>
          <li className="li">
            Improving Our Services: To analyze site usage and improve your
            shopping experience by enhancing the features and functionality of
            our website.
          </li>
          <li className="li">
            Fraud Prevention: To detect and prevent fraudulent activity or
            unauthorized access to our services.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">
          3. How We Protect Your Information
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          We implement a variety of security measures to maintain the safety of
          your personal information. These include:
        </p>
        <ul className="mb-2">
          <li className="li">
            Encryption: All sensitive payment information is encrypted using
            Secure Socket Layer (SSL) technology during transmission.
          </li>
          <li className="li">
            Secure Servers: Your personal information is stored on secure
            servers that are protected by firewalls and other security
            technologies.
          </li>
          <li className="li">
            Third-Party Payment Processors: We partner with trusted third-party
            payment processors (such as PayPal, Stripe, etc.) to handle your
            financial transactions securely. We do not store your full credit
            card information.
          </li>
        </ul>
        <p className="paragraph">
          While we strive to protect your data, no method of transmission over
          the Internet or electronic storage is 100% secure. However, we use
          commercially acceptable means to protect your personal data.
        </p>

        <p className="text-md mb-2 font-semibold">
          4. Sharing Your Information
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your data with the following entities
          under specific circumstances
        </p>
        <ul className="mb-7">
          <li className="li">
            Service Providers: We may share your information with trusted
            third-party companies (e.g., shipping carriers, payment processors,
            email service providers) who assist in processing your orders or
            providing services on our behalf. These companies are obligated to
            keep your information confidential and use it only to perform
            services for us.
          </li>
          <li className="li">
            Business Transfers: In the event of a merger, acquisition, or sale
            of all or part of our assets, your personal information may be
            transferred as part of that transaction.
          </li>
          <li className="li">
            Legal Compliance: We may disclose your personal information if
            required to do so by law, or in response to legal requests (e.g.,
            subpoenas, court orders).
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">5. Your Rights and Choices</p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          You have certain rights regarding your personal information:
        </p>
        <ul className="mb-7">
          <li className="li">
            Access: You can request access to the personal information we have
            on file about you.
          </li>
          <li className="li">
            Correction: You can update or correct your information if it is
            inaccurate.
          </li>
          <li className="li">
            Deletion: You can request that we delete your personal information,
            subject to certain exceptions (e.g., if we need to retain it for
            legal purposes).
          </li>
          <li className="li">
            Opt-Out of Marketing Communications: If you no longer wish to
            receive promotional emails from us, you can opt out at any time by
            clicking the “unsubscribe” link in the email or contacting us
            directly at [Customer Service Email].
          </li>
          <li className="li">
            Cookies: You can control cookie settings through your browser
            settings, including accepting or rejecting cookies.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">6. Third-Party Links</p>
        <p className="paragraph">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these external
          sites. We encourage you to read the privacy policies of any linked
          sites you visit.
        </p>

        <p className="text-md mb-2 font-semibold">7. Children's Privacy</p>
        <p className="paragraph">
          Our website is not intended for children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          we become aware that we have inadvertently collected personal
          information from a child under the age of 13, we will take steps to
          delete that information as quickly as possible.
        </p>

        <p className="text-md mb-2 font-semibold">
          8. Changes to This Privacy Policy
        </p>
        <p className="paragraph">
          We reserve the right to update or change our Privacy Policy at any
          time. Any updates will be posted on this page, and the “Last Updated”
          date at the top of this policy will reflect the date of the changes.
          Please review this Privacy Policy periodically to stay informed about
          how we are protecting your information.
        </p>

        <p className="text-md mb-2 font-semibold">9. Contact Us</p>
        <p className="text-sm mb-5 leading-[1.5rem]">
          If you have any questions or concerns about this Privacy Policy, or if
          you wish to exercise any of your rights regarding your personal
          information, please contact us at:
        </p>
        <p className="text-lg mb-2 leading-[1.5rem] font-semibold">
          {process.env.APP_NAME}
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          Email: {process.env.APP_EMAIL}
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          Phone: {process.env.APP_PHONE}
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          Mailing Address: {process.env.APP_ADDRESS}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
