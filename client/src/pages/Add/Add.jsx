import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/InputField/InputField";
import * as yup from "yup";
import "./Add.scss";
import apiRequest from "../../ultis/apiRequest";
import axios from "axios";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const addSchema = yup
  .object()
  .shape({
    title: yup.string().required("Title is required"),
    image: yup.mixed().test("file", "You need to provide a file", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    }),
    desc: yup.string().required("Description is required"),
    shortTitle: yup.string().required("Short Title is required"),
    shortDesc: yup.string().required("Short Description is required"),
    deliveryTime: yup
      .number()
      .min(1, "Delivery Time is must be at least 1")
      .max(90, "Delivery Time must not exceed 90 days")
      .typeError("You must specify a Delivery Time")
      .required("Delivery Time is required"),
    revisionNumber: yup
      .number()
      .typeError("You must specify a Revision Number")
      .required("Revision Number is required"),
    price: yup
      .number()
      .typeError("You must specify a price")
      .min(0, "Minimum Price should be at least 0")
      .max(9999, "Exceed the Maximum Price of 9999")
      .required("Price is required"),
  })
  .required();

const Add = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(addSchema),
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Cloudinary Image||Images Upload Function
  const uploadImages = async (files) => {
    if (!Array.isArray(files)) {
      files = [files];
    }
    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "allure_gigs");
      return axios
        .post("https://api.cloudinary.com/v1_1/tamazo/image/upload", formData)
        .then((response) => {
          const data = response.data;

          const fileURL = { url: data.secure_url, public_id: data.public_id };

          return fileURL;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    const urls = await axios.all(uploaders);
    if (urls.length === 1) {
      return urls[0];
    } else {
      return urls;
    }
  };

  const onSubmit = async (data) => {
    const features = (data.features || "")
      .replace(/(?!\b\s+\b)\s+/g, "")
      .split(",")
      .filter((x) => x !== "");

    const imageUrl = await uploadImages(data.image[0]);
    const imgUrls = await uploadImages([...data.imgs]);
    await apiRequest
      .post("gigs", {
        ...data,
        features,
        image: imageUrl,
        imgs: imgUrls,
      })
      .then(() => {
        setMessage("Successfully");
        navigate("/myGigs");
      })
      .catch((err) => {
        setMessage(err?.message);
      });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleMessageClose = () => {
    setMessage(null);
  };

  return (
    <section className="add">
      <div className="container">
        <div className="add-title">
          <h1>Add New Gig</h1>
          {message && (
            <p
              className="response-message"
              aria-errormessage={message === "Successfully" ? false : true}
            >
              {message}
              <XMarkIcon onClick={handleMessageClose} className="close-icon" />
            </p>
          )}
        </div>
        <div className="sections">
          <div className="info">
            <InputField
              type="text"
              label="Title"
              register={register}
              name="title"
              placeholder="Title"
              errors={errors?.title}
            />
            <InputField
              register={register}
              label="Category"
              name="category"
              errors={errors?.category}
              type="select"
              options={[
                { value: "design", title: "Web Designer" },
                { value: "animation", title: "Animation" },
                { value: "ai", title: "AI" },
                { value: "developer", title: "Web Developer" },
              ]}
            />
            <InputField
              type="file"
              label="Cover Image"
              register={register}
              name="image"
              errors={errors?.image}
            />
            <InputField
              type="file"
              label="Images"
              register={register}
              name="imgs"
              multiple
            />
            <InputField
              type="textarea"
              label="Description"
              register={register}
              name="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              errors={errors?.desc}
              rows={6}
            />
            <InputField
              type="text"
              label="Add Features"
              register={register}
              name="features"
              placeholder="eg. hoisting,page design,file uploading"
              errors={errors?.features}
            />
          </div>
          <div className="details">
            <InputField
              type="text"
              label="Service Title"
              register={register}
              name="shortTitle"
              placeholder="e.g. One-page web design"
              errors={errors?.shortTitle}
            />
            <InputField
              type="textarea"
              cols="4"
              label="Short Description"
              register={register}
              rows="6"
              name="shortDesc"
              placeholder="Short description of your service"
              errors={errors?.shortDesc}
            />
            <InputField
              type="number"
              label="Delivery Time"
              register={register}
              name="deliveryTime"
              min="1"
              max="31"
              placeholder="Delivery Time (e.g. 3)"
              errors={errors?.deliveryTime}
            />
            <InputField
              type="number"
              label="Revision Number"
              register={register}
              name="revisionNumber"
              placeholder="Revision Number"
              errors={errors?.revisionNumber}
            />

            <InputField
              type="number"
              label="Price"
              register={register}
              name="price"
              placeholder="eg. 250"
              errors={errors?.price}
            />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? "Loading..." : "Create"}
        </button>
      </div>
    </section>
  );
};

export default Add;
