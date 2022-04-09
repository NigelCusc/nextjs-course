import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/hero-1.jpg"
          alt="An image showing Nigel"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Nigel</h1>
      <p>Software Developer. This is built with Next.js</p>
    </section>
  );
}

export default Hero;
