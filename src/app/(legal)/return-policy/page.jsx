import PageHeaderTwo from "@/components/globals/PageHeaderTwo";

export const metadata = {
  title: "Return Policy",
};

const ReturnPage = () => {
  return (
    <div className="h-full top-[100px]">
      <PageHeaderTwo title="Return Policy" />
      <div className="container py-20 px-5 lg:px-20">
        <h1 className="text-md font-semibold mb-10">Return Policy</h1>

        <p className="paragraph">
          At yayyu lifestyle, we want you to love your purchase! If you are not
          completely satisfied with your order, we offer an easy and hassle-free
          return process. Please review our policy below for all the details.
        </p>

        <p className="text-md mb-2 font-semibold">Returns</p>
        <p className="paragraph">
          You can return your item(s) within 30 days from the date of delivery
          for a full refund or exchange, subject to the following conditions:
        </p>

        <p className="text-md mb-2 font-semibold">1. Eligibility</p>
        <ul className="mb-7">
          <li className="li">
            Items must be in new, unused condition, with all original tags,
            labels, and packaging intact.
          </li>
          <li className="li">
            Items must be returned within 30 days of receiving your order. After
            this period, we can no longer accept returns or exchanges.
          </li>
        </ul>

        <p className="text-md mb-2 font-semibold">2. Non-Returnable Items</p>
        <p className="paragraph">
          The following items are final sale and cannot be returned:
        </p>
        <ul className="mb-7">
          <li className="li">Sale or clearance items</li>
          <li className="li">
            Underwear, swimwear, or intimate apparel (for hygiene reasons)
          </li>
          <li className="li">Customized or personalized items</li>
        </ul>

        <p className="text-md mb-2 font-semibold">How to Return Your Item(s)</p>
        <ol className="mb-7">
          <li className="li">Step 1: Contact Us.</li>
          <p className="ms-12 text-sm mb-2 leading-[1.5rem]">
            Reach out to our Customer Service team at {process.env.APP_EMAIL}
            with your order number and the item(s) you wish to return. We will
            provide you with a Return Authorization (RA) number and detailed
            instructions.
          </p>

          <li className="li">Step 2: Pack Your Return</li>
          <p className="ms-12 text-sm mb-2 leading-[1.5rem]">
            Carefully package your items to avoid damage during transit. Please
            include the RA number and your original order receipt in the
            package.
          </p>

          <li className="li">Step 3: Ship the Item(s) Back</li>
          <p className="ms-12 text-sm mb-2 leading-[1.5rem]">
            You are responsible for the return shipping costs, unless the item
            is defective or the return is due to an error on our part. We
            recommend using a trackable shipping method to ensure the safe
            return of your item(s).
          </p>
        </ol>

        <p className="ml-5 text-md mb-2 font-semibold">Refunds & Processing</p>
        <p className="paragraph">
          Once we receive your returned item(s), we will inspect it to ensure it
          meets the return criteria. If everything is in order, we will process
          your refund to the original payment method within 7-10 business days.
        </p>
        <ul className="mb-7">
          <li className="li">
            Refunds will exclude the original shipping fees unless the return is
            due to a defect or error on our part.
          </li>
          <li className="li">
            If you opted for an exchange, we will ship your replacement item(s)
            as soon as the return is processed.
          </li>
        </ul>

        <p className="ml-5 text-md mb-2 font-semibold">Exchanges</p>
        <p className="paragraph">
          We are happy to offer exchanges on most items within the return
          window. To exchange an item, please follow the same return steps
          above, and once we receive your returned item, we will send out the
          replacement.
        </p>

        <p className="ml-5 text-md mb-2 font-semibold">
          Damaged or Defective Items
        </p>
        <p className="paragraph">
          If you receive a damaged or defective item, please contact us
          immediately at {process.env.APP_EMAIL}. We will arrange a return at no
          additional cost to you, and offer a full refund or replacement.
        </p>

        <p className="ml-5 text-md mb-2 font-semibold">International Returns</p>
        <p className="paragraph">
          For international orders, please contact our Customer Service team for
          assistance with the return process. Customers are responsible for any
          return shipping fees, customs duties, and taxes.
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

export default ReturnPage;
