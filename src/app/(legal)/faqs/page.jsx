import PageHeaderTwo from "@/components/globals/PageHeaderTwo";

export const metadata = {
  title: "FAQs",
};

const FAQsPage = () => {
  return (
    <div className="h-full top-[100px]">
      <PageHeaderTwo title="FAQs" />
      <div className="container py-20 px-5 lg:px-20">
        <h1 className="text-md font-semibold mb-10">FAQs</h1>

        <p className="paragraph">
          Welcome to our FAQ section! Here, you will find answers to the most
          common questions about our products, ordering process, shipping,
          returns, and more. If you don't find the answer you are looking for,
          feel free to contact our customer service team at{" "}
          {process.env.APP_EMAIL}.
        </p>

        <p className="text-md mb-2 font-semibold">
          1. How do I place an order?
        </p>
        <p className="paragraph">
          Placing an order is simple! Just follow these steps:
        </p>
        <ul className="mb-7">
          <li className="li">
            Browse our collection and select the items you want to purchase.
          </li>
          <li className="li">
            Choose your size, color, and any other relevant options.
          </li>
          <li className="li">Add your items to the cart.</li>
          <li className="li">
            Go to the checkout page, enter your shipping information, and select
            your preferred payment method.
          </li>
          <li className="li">
            Review your order and click "Place Order" to complete your purchase.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">
          2. What payment methods do you accept?
        </p>
        <p className="paragraph">We accept the following payment methods:</p>
        <ul className="mb-2">
          <li className="li">
            Credit/Debit Cards: Visa, MasterCard, American Express, Discover
          </li>
          <li className="li">PayPal</li>
          <li className="li">Apple Pay</li>
          <li className="li">Google Pay</li>
          <li className="li">Klarna (for installment payments)</li>
        </ul>
        <p className="text-sm mb-7 leading-[1.5rem]">
          All payments are securely processed through our payment gateway.
        </p>

        <p className="text-md mb-2 font-semibold">
          3. How can I track my order?
        </p>
        <p className="text-sm mb-7 leading-[1.5rem]">
          Once your order ships, you will receive an email with a tracking
          number and a link to the carrier's website. You can use this to track
          the status of your delivery in real time. <br />
          If you haven't received tracking information within 3 business days of
          placing your order, please reach out to our customer service team.
        </p>

        <p className="text-md mb-2 font-semibold">
          4. Can I change or cancel my order after placing it?
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          We process orders quickly to ensure prompt delivery, so once your
          order is confirmed, we cannot make changes or cancel it. However, if
          you notice an issue right after placing your order, please contact us
          immediately at {process.env.APP_EMAIL} and we will try our best to
          assist you.
        </p>

        <p className="text-md mb-2 font-semibold">
          5. What if I received a damaged or defective item?
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          We are sorry if your order arrived damaged or defective! Please
          contact us within 7 days of receiving your item with the following
          information:
        </p>
        <ul className="mb-2">
          <li className="li">Your order number</li>
          <li className="li">A photo of the damaged or defective item</li>
          <li className="li">A photo of the packaging (if applicable)</li>
        </ul>
        <p className="text-sm mb-7 leading-[1.5rem]">
          We will arrange for a replacement or issue a refund based on your
          preference.
        </p>

        <p className="text-md mb-2 font-semibold">
          6. What is your return policy?
        </p>
        <p className="text-sm mb-2 leading-[1.5rem]">
          We offer hassle-free returns within 30 days of receiving your order.
          To be eligible for a return, the item(s) must be in new, unworn
          condition with all original tags attached. To start a return, please
          follow these steps:
        </p>
        <ul className="mb-2">
          <li className="li">
            Contact us at [Customer Service Email] to request a Return
            Authorization (RA) number.
          </li>
          <li className="li">
            Ship the item(s) back to us using a trackable shipping method.
          </li>
          <li className="li">
            Once your return is processed, we will issue a refund to your
            original payment method.
          </li>
        </ul>
        <p className="text-sm mb-7 leading-[1.5rem]">
          Please note, certain items like sale or clearance products, intimate
          wear, and personalized items may not be eligible for return. Refer to
          our full return policy for more details.
        </p>

        <p className="text-md mb-2 font-semibold">7. Do you offer exchanges?</p>
        <p className="text-sm mb-7 leading-[1.5rem]">
          Yes! We offer exchanges for items that are the wrong size, color, or
          style, as long as they meet our return criteria. To exchange an item,
          please follow the same return process, and once we receive your
          returned item(s), we will ship out the replacement at no extra cost.
        </p>

        <p className="text-md mb-2 font-semibold">
          8. How much does shipping cost?
        </p>
        <p className="text-sm mb-7 leading-[1.5rem]">
          Shipping rates depend on the size and weight of your order, as well as
          your shipping location. At checkout, you will be able to see the
          available shipping options and the associated costs. <br />
          We offer free standard shipping on orders over $[X] within
          [Country/Region].
        </p>

        <p className="text-md mb-2 font-semibold">
          9. Do you ship internationally?
        </p>
        <p className="text-sm mb-7 leading-[1.5rem]">
          Yes! We ship to most countries worldwide. International orders may
          take between 7-14 business days to arrive, depending on the
          destination. Additional customs fees, import duties, and taxes may
          apply depending on your country's regulations and are the
          responsibility of the customer.
        </p>

        <p className="text-md mb-2 font-semibold">
          10. I entered the wrong shipping address. Can I change it?
        </p>
        <p className="text-sm mb-7 leading-[1.5rem]">
          If you realize you've entered an incorrect address, please contact us
          immediately at {process.env.APP_EMAIL}. If your order hasn't been
          shipped yet, we can make the necessary corrections. Once your order
          has shipped, we are unable to modify the address.
        </p>

        <p className="ml-5 text-md mb-2 font-semibold">
          11. My order hasn't arrived yet. What should I do?
        </p>
        <p className="paragraph">
          If your order hasn't arrived within the expected delivery timeframe,
          please:
        </p>
        <ul className="mb-7">
          <li className="li">
            Check the tracking information to see the status of your delivery.
          </li>
          <li className="li">
            Verify with your local carrier or postal service to check if the
            package is being held.
          </li>
          <li className="li">
            Contact our customer service team at {process.env.APP_EMAIL} for
            assistance if you still haven't received your order after the
            estimated delivery date.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">
          12. How do I care for my items to keep them in great condition?
        </p>
        <p className="text-sm mb-7 leading-[1.5rem]">
          For care instructions, we recommend following the labels attached to
          each item. In general, we suggest washing delicate fabrics in cold
          water and air drying or laying flat to dry to avoid shrinking. If you
          need more detailed care instructions, feel free to reach out!
        </p>

        <p className="text-md mb-2 font-semibold">
          13. How do I sign up for your newsletter?
        </p>
        <p className="text-sm mb-7 leading-[1.5rem]">
          To stay updated on new arrivals, exclusive offers, and sales, simply
          enter your email address at the bottom of our website or sign up on
          our Newsletter Sign-Up Page. You will receive updates straight to your
          inbox!
        </p>

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

export default FAQsPage;
