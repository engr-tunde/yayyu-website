import PageHeaderTwo from "@/components/globals/PageHeaderTwo";

export const metadata = {
  title: "Delivery Policy",
};

const DeliveryPage = () => {
  return (
    <div className="h-full top-[100px]">
      <PageHeaderTwo title="Delivery Policy" />
      <div className="container py-20 px-5 lg:px-20">
        <h1 className="font-semibold mb-10">Return Policy</h1>

        <p className="text-md mb-2 font-semibold">Delivery Policy</p>
        <p className="paragraph">
          At yayyu lifestyle, we want to ensure that your order reaches you
          quickly and safely. Please review our delivery policy below for
          detailed information about how we handle shipping, delivery timelines,
          and any special considerations.
        </p>

        <p className="text-md mb-2 font-semibold">Delivery Timeframes</p>
        <p className="paragraph">
          We strive to deliver your order as quickly as possible! Our delivery
          times depend on the shipping method you select and your delivery
          location.
        </p>

        <p className="text-md mb-2 font-semibold">1. Standard Delivery</p>
        <ul className="mb-7">
          <li className="li">
            Delivery Time: 5-7 business days from the date your order is
            shipped.
          </li>
          <li className="li">Available for: Domestic orders within Nigeria.</li>
        </ul>

        <p className="text-md mb-2 font-semibold">2. Expedited Delivery</p>
        <ul className="mb-7">
          <li className="li">
            Delivery Time: 2-3 business days from the date your order is
            shipped.
          </li>
          <li className="li">Available for: Domestic orders within Nigeria.</li>
        </ul>

        <p className="text-md mb-2 font-semibold">3. Express Delivery</p>
        <ul className="mb-7">
          <li className="li">
            Delivery Time: 1 business day (Next-Day Delivery).
          </li>
          <li className="li">
            Available for: Orders placed before [cutoff time, e.g., 2 PM] within
            [Country].
          </li>
        </ul>

        <p className="ml-5 text-md mb-2 font-semibold">
          4. International Delivery
        </p>
        <ul className="mb-7">
          <li className="li">
            Delivery Time: Typically 7-14 business days, depending on your
            location.
          </li>
          <li className="li">Available for: International orders.</li>
          <li className="li">
            Note: Delivery times may vary due to customs processing and local
            shipping conditions.
          </li>
        </ul>

        <p className="ml-5 text-md mb-2 font-semibold">Shipping Cutoff Times</p>
        <ul className="mb-7">
          <li className="li">
            Orders placed before 2:00 PM EST on business days will be processed
            and shipped the same day (subject to product availability).
          </li>
          <li className="li">
            Orders placed after 2:00 PM EST will be processed the following
            business day.
          </li>
          <li className="li">
            Orders placed on weekends or public holidays will be processed on
            the next business day.
          </li>
        </ul>

        <p className="ml-5 text-md mb-2 font-semibold">Order Tracking</p>
        <ul className="mb-7">
          <li className="li">
            Once your order ships, you will receive a tracking number via email,
            allowing you to track the progress of your delivery.
          </li>
          <li className="li">
            You can track your order through the courier&apos;s website, and you
            will receive updates on the estimated delivery date.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Shipping Carrier</p>
        <ul className="mb-7">
          <li className="li">
            We partner with reliable shipping carriers such as [Carrier Names,
            e.g., UPS, FedEx, USPS, DHL] to ensure your package arrives on time
            and in perfect condition.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Shipping Restrictions</p>
        <ul className="mb-7">
          <li className="li">
            We do not deliver to P.O. Boxes, APO/FPO addresses, or international
            forwarding addresses.
          </li>
          <li className="li">
            Remote Areas: Some rural or remote areas may experience longer
            delivery times, depending on the courier&apos;s coverage.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Delivery Issues</p>
        <p className="ms-5 text-md mb-2 font-semibold">1. Incorrect Address</p>
        <ul className="mb-7">
          <li className="li">
            Please double-check the shipping address during checkout to avoid
            delays. If you need to update your address, contact us as soon as
            possible at {process.env.APP_EMAIL}. Once an order has been
            processed, we cannot change the shipping address.
          </li>
        </ul>

        <p className="ms-5 text-md mb-2 font-semibold">
          2. Missing or Lost Packages
        </p>
        <ul className="mb-7">
          <li className="li">
            If your package is marked as &quot;delivered&quot; but you have not
            received it, please first check with neighbors or your local postal
            service. We are not responsible for lost or stolen packages once
            they are marked as delivered by the carrier.
          </li>
          <li className="li">
            If you believe your package was lost, please contact our Customer
            Service team at {process.env.APP_EMAIL} and we will assist you with
            the claims process.
          </li>
        </ul>

        <p className="ms-5 text-md mb-2 font-semibold">3. Damaged Items</p>
        <ul className="mb-7">
          <li className="li">
            If your order arrives damaged or defective, please contact us
            immediately at {process.env.APP_EMAIL} with photos of the damaged
            items and packaging. We will process your claim promptly and send
            you a replacement or issue a refund, depending on your preference.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">Delivery Delays</p>
        <p className="paragraph">
          While we make every effort to ensure timely delivery, please be aware
          that delays may occur due to unforeseen circumstances, such as:
        </p>
        <ul className="mb-7">
          <li className="li">Weather conditions or natural disasters</li>
          <li className="li">Shipping carrier delays</li>
          <li className="li">Customs processing for international orders</li>
        </ul>

        <p className="text-sm mb-7 leading-[1.5rem]">
          In case of any significant delays, we will notify you via email and
          work to resolve the issue as quickly as possible.
        </p>

        <p className="text-md mb-2 font-semibold">Contact Us</p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          If you have any questions or need assistance with your order, feel
          free to contact our Customer Service team at {process.env.APP_PHONE}{" "}
          or {process.env.APP_EMAIL}. We are here to help!
        </p>
      </div>
    </div>
  );
};

export default DeliveryPage;
