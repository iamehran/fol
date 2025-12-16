import Spline from '@splinetool/react-spline';

export default function SplineSection() {
  return (
    <section className="relative w-full h-screen bg-background overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/jxJSFOOO1mYBTmBT/scene.splinecode"
          className="w-full h-full"
        />
      </div>
      
      {/* Optional gradient overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
