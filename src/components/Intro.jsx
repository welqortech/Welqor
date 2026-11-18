import './Intro.css';

export default function Intro() {
  return (
    <section className="intro section" id="about">
      <div className="wrap">
        <h2 className="intro__statement">
          Welqor is a software studio. We design, build and run websites, apps and custom
          software for businesses that want it done properly.
        </h2>
        <div className="intro__cols">
          <p className="intro__point">Bring a rough idea or a detailed spec.</p>
          <p className="intro__text">
            We turn it into a clear plan, a fixed quote and a product your customers can use.
            Design, development, hosting and support sit with one team, so nothing gets lost
            between vendors and you always know who to call.
          </p>
        </div>
      </div>
    </section>
  );
}
