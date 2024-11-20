import PageHeaderTwo from "@/components/globals/PageHeaderTwo";

export const metadata = {
  title: "Shipping Policy",
};

const ShippingPage = () => {
  return (
    <div className="h-full top-[100px]">
      <PageHeaderTwo title="Shipping Policy" />
      <div className="container py-20 px-5 lg:px-20">
        <h1 className="font-semibold mb-10">Shipping Policy</h1>

        <p className="paragraph">
          At yayyu lifestyle, we are committed to delivering your order as
          quickly and efficiently as possible. Please review our shipping policy
          below to learn about processing times, shipping options, and delivery
          details.
        </p>

        <p className="text-md mb-2 font-semibold">Order Processing</p>
        <ul className="mb-7">
          <li className="li">
            Order Processing Time: All orders are processed within 1-3 business
            days of receiving your order (excluding weekends and holidays).
          </li>
          <li className="li">
            Orders placed after 2:00 PM EST may be processed the following
            business day.
          </li>
          <li className="li">
            You will receive an email with tracking information once your order
            has been shipped.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Shipping Methods & Rates</p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          We offer a variety of shipping options to suit your needs. Shipping
          rates are calculated at checkout based on your location, order size,
          and shipping method.
        </p>
        <p className="ml-5 text-md mb-2 font-semibold">1. Standard Shipping</p>
        <ul className="mb-7">
          <li className="li">Delivery Time: 5-7 business days</li>
          <li className="li">
            Shipping Rate: Based on your location and order size. Calculated at
            checkout.
          </li>
        </ul>
        <p className="ml-5 text-md mb-2 font-semibold">2. Expedited Shipping</p>
        <ul className="mb-7">
          <li className="li">Delivery Time: 2-3 business days</li>
          <li className="li">
            Shipping Rate: Based on your location and order size. Calculated at
            checkout.
          </li>
        </ul>
        <p className="ml-5 text-md mb-2 font-semibold">3. Express Shipping</p>
        <ul className="mb-7">
          <li className="li">
            Delivery Time: 1 business day (Next-Day Delivery)
          </li>
          <li className="li">
            Shipping Rate: Based on your location and order size. Calculated at
            checkout.
          </li>
        </ul>
        <p className="ml-5 text-md mb-2 font-semibold">4. Free Shipping</p>
        <ul className="mb-7">
          <li className="li">
            We offer free standard shipping on orders over $[X] within
            [Country/Region]. The discount will be automatically applied at
            checkout.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">International Shipping</p>
        <ul className="mb-2">
          <li className="li">We ship to most countries worldwide!</li>
          <li className="li">
            International orders may be subject to customs fees, import duties,
            or taxes, which are the responsibility of the customer. Please check
            with your local customs office for more information before placing
            your order.
          </li>
          <li className="li">
            Delivery times for international orders vary depending on the
            destination, but typically take between 7-14 business days.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Order Tracking</p>
        <ul className="mb-7">
          <li className="li">
            Once your order ships, you will receive a tracking number via email.
            You can track the progress of your order through the courier&apos;s
            website.
          </li>
          <li className="li">
            If you have not received tracking information within 3 business
            days, please reach out to our Customer Service team for assistance.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Shipping Restrictions</p>
        <ul className="mb-7">
          <li className="li">
            We do not ship to P.O. Boxes, APO/FPO addresses, or international
            forwarding addresses. Please ensure that you provide a valid street
            address for shipping.
          </li>
          <li className="li">
            Some remote locations may have longer shipping times.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Missing or Lost Packages</p>
        <ul className="mb-7">
          <li className="li">
            We are not responsible for lost or stolen packages once the tracking
            shows they have been delivered. However, if your package is marked
            as delivered but you haven&apos;t received it, please contact the
            shipping carrier to initiate an investigation.
          </li>
          <li className="li">
            If you need help, feel free to contact our Customer Service team at
            [Customer Service Email] and we will assist you.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Damaged Items</p>
        <ul className="mb-7">
          <li className="li">
            If your order arrives damaged, please contact us at{" "}
            {process.env.APP_EMAIL} immediately with photos of the damaged items
            and packaging. We will work with you to resolve the issue as quickly
            as possible, whether that is by sending a replacement or issuing a
            refund.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Contact Us</p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          If you have any questions or need assistance with your order, feel
          free to contact our Customer Service team at {process.env.APP_PHONE}
          or {process.env.APP_EMAIL}. We are here to help!
        </p>
      </div>
    </div>
  );
};

export default ShippingPage;
