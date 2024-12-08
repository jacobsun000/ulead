
export default function Video({ src, poster }) {
  return (
    <video className="m-0 p-0 block rounded-xl" width="640" height="360" controls poster={poster} preload="metadata">
      <source src={src} type="video/mp4" />
    </video>
  );
}
