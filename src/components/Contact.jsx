import { useState } from 'react';
import { SITE } from '../config';
import { NEEDS } from '../content';
import Grain from './Grain';
import './Contact.css';

const EMPTY = { name: '', email: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
    errors.email = 'Enter an email address so we can reply.';
  if (values.message.trim().length < 10)
    errors.message = 'Describe the project in a sentence or two.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [needs, setNeeds] = useState([]);
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const toggleNeed = (need) =>
    setNeeds((list) => (list.includes(need) ? list.filter((n) => n !== need) : [...list, need]));

  // No backend yet: the form writes the enquiry into the visitor's email app.
  // To use a form service later (Formspree, EmailJS, your own API), replace
  // the mailto lines below with a fetch() call.
  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    const subject = `Project enquiry from ${values.name.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Looking for: ${needs.length ? needs.join(', ') : 'Not specified'}`,
      '',
      values.message.trim(),
    ].join('\n');

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const fieldClass = (name) => `field${errors[name] ? ' field--error' : ''}`;

  return (
    <section className="contact section on-dark" id="contact">
      <Grain className="contact__grain" />
      <div className="contact__grid wrap">
        <div className="contact__intro">
          <h2 className="section-title contact__title">Tell us what you want to build.</h2>
          <p className="contact__lede">
            A few lines is enough. We reply within one working day with questions or next steps.
          </p>
          <div className="contact__direct">
            <p>Prefer email?</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form__row">
            <div className={fieldClass('name')}>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={update}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <p className="field__error" id="contact-name-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className={fieldClass('email')}>
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={update}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <p className="field__error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <fieldset className="field">
            <legend>What do you need?</legend>
            <div className="chips">
              {NEEDS.map((need) => (
                <label className="chip" key={need}>
                  <input
                    type="checkbox"
                    checked={needs.includes(need)}
                    onChange={() => toggleNeed(need)}
                  />
                  <span>{need}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={fieldClass('message')}>
            <label htmlFor="contact-message">About the project</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="What are you building, who is it for, and when do you need it?"
              value={values.message}
              onChange={update}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && (
              <p className="field__error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          <div className="form__foot">
            <button className="btn btn--primary" type="submit">
              Send enquiry
            </button>
            <p className="form__hint">Opens your email app with the details filled in.</p>
          </div>

          {opened && (
            <p className="form__status" role="status">
              Your email app should now be open with the enquiry ready. Press send there to reach
              us. If nothing opened, write to <strong>{SITE.email}</strong>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
