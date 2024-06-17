"use client";
import { validateField } from "../../services/form/validateField";
import styles from "./ContactForm.module.scss";
import React, { FormEvent, useState } from "react";

type ContactFormProps = {};

const ContactForm: React.FC<ContactFormProps> = () => {
  const [errors, setErrors] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    subject: false,
    content: false,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userMessageTitle, setUserMessageTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      name,
      email,
      subject,
      content,
    };

    // Basic field validation
    let currentErrors = { ...errors };
    let hasErrors = false;

    if (!validateField("text", name)) {
      currentErrors.name = true;
      hasErrors = true;
    }

    if (!validateField("email", email)) {
      currentErrors.email = true;
      hasErrors = true;
    }

    if (!validateField("text", subject)) {
      currentErrors.subject = true;
      hasErrors = true;
    }

    if (!validateField("text", content)) {
      currentErrors.content = true;
      hasErrors = true;
    }

    // Got errors, bail, state will handle updating DOM
    if (hasErrors) {
      setErrors(currentErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Got here, send the form to our API
      const req = await fetch("/api/v1/hey", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const res = await req.json();

      // Is there a server side error?
      if (res.errors) {
        setErrors(res.errors);
        setUserMessageTitle("There's been an error");
        setErrorMessage(
          `There's been an error with the request. Check that you have filled the form correctly and try again.`
        );
        setFeedbackOpen(true);
        setIsLoading(false);
        return;
      } else {
        setTimeout(() => {
          setUserMessageTitle("Message sent successfully");
          setSuccessMessage(
            "The message has been successfully sent and someone will respond to you ASAP. We try to respond to people within 72 hours but it may sometimes be longer."
          );
          setErrorMessage("");
          setName("");
          setEmail("");
          setSubject("");
          setContent("");
          setIsLoading(false);
          setFeedbackOpen(true);
        }, 500);
      }
    } catch (e) {
      setUserMessageTitle("There's been an error");
      setErrorMessage(
        `There's been an error with the request. Check that you have filled the form correctly and try again.`
      );
      setFeedbackOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["contact-wrapper"]} data-loading={isLoading}>
      <div className={styles["contact-header"]}>
        <h3>Get in touch</h3>
        <p>
          Use the form below to get in contact with us for any reason at all.
        </p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className={styles["contact-field-wrapper"]}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputMode="text"
            data-error={errors.name}
            onClick={() =>
              setErrors({
                ...errors,
                name: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                name: !validateField("text", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Minimum 3 letters</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <label>Email</label>
          <input
            data-error={errors.email}
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() =>
              setErrors({
                ...errors,
                email: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                email: !validateField("email", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Must be a valid email</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <label>Subject</label>
          <input
            data-error={errors.subject}
            type="text"
            inputMode="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onClick={() =>
              setErrors({
                ...errors,
                subject: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                subject: !validateField("text", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Minimum 3 letters</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <label>Message</label>
          <textarea
            data-error={errors.content}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            onClick={() =>
              setErrors({
                ...errors,
                content: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                content: !validateField("text", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Minimum 3 letters</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <input type="submit" placeholder="Submit" disabled={isLoading} />
        </div>
      </form>
      {feedbackOpen ? (
        <div className={styles["feedback-wrapper"]}>
          <div className={styles["feedback-content-wrapper"]}>
            <div className={styles["feedback-content-header"]}>
              {userMessageTitle}
            </div>
            <div className={styles["feedback-content-message"]}>
              {errorMessage || successMessage}
            </div>
            <div className={styles["feedback-content-close"]}>
              <button
                onClick={() => {
                  setFeedbackOpen(false);
                  setUserMessageTitle("");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { ContactForm };
