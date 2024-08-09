import catimg from "./assets/catimg.avif";
export default function Post() {
  return (
    <div className="post">
      <img src={catimg} alt="post image"></img>
      <div className="texts">
        <h2>More fwens coming this year</h2>
        <p className="info">
          <a className="author">Jelly Dai</a>
          <time>2024-01-24 16:45</time>
        </p>
        <p className="summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eligendi
          soluta aperiam nulla odit iusto ex minima voluptatem saepe
          reprehenderit.
        </p>
      </div>
    </div>
  );
}
