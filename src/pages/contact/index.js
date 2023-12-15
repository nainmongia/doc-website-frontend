import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import LayoutFour from "../../components/Layout/LayoutOne";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import ContactInfoItem from "../../components/Pages/Contact/ContactInfoItem";
import contactData from "../../data/pages/contact.json";
import Loading  from "../../components/Other/Loading";

export default function () {
  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const ref = useRef();
  const onSubmit = (data) => {
    setSuccess(true);
    emailjs
    .sendForm(
      "service_nevm3b9",
      "template_r42grie",
      ref.current,
      'public key'
    )
    .then(
      (result) => {
        console.log(result.text);
        setSuccess(false);

      },
      (error) => {
        console.log(error.text);
        setSuccess(false);
      }
    );
  };
  return (
    <LayoutFour title="Contact us">
      <Breadcrumb title="Contact us">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Contact us" current />
      </Breadcrumb>
      {
        success && <Loading />
      }
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3 className="contact-title">Contact info</h3>
              {contactData &&
                contactData.map((item, index) => (
                  <ContactInfoItem
                    key={index}
                    iconClass={item.iconClass}
                    title={item.title}
                    detail={item.detail}
                  />
                ))}
            </div>
            <div className="col-12 col-md-6">
              <h3 className="contact-title">Get in touch</h3>
              <div className="contact-form">
                <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-validator">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      ref={register({ required: true })}
                    />
                    {errors.name && (
                      <span className="input-error">Please provide a name</span>
                    )}
                  </div>
                  <div className="input-validator">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      ref={register({ required: true })}
                    />
                    {errors.email && (
                      <span className="input-error">
                        Please provide an email
                      </span>
                    )}
                  </div>
                  <div className="input-validator">
                    <textarea
                      name="message"
                      id=""
                      cols="30"
                      rows="3"
                      placeholder="Message"
                    />
                  </div>
                  <button className="btn -dark">SEND MESSAGE</button>
                </form>
              </div>
            </div>
            <div className="col-12">
              <iframe
                className="contact-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14412.962923590754!2d81.77599883093208!3d25.43021413289322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398534b258c11777%3A0xcd939a92827890ef!2sKalindipuram%20Telephone%20Exchange!5e0!3m2!1sen!2sin!4v1694772290731!5m2!1sen!2sin"
                width="100%"
                height="450"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
      {/* <InstagramTwo /> */}
    </LayoutFour>
  );
}
