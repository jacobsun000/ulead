import SuccessStory from './SuccessStory';
import Slider from './Slider';

export default function SuccessStories({ profiles }) {
  const storyCards = profiles.map((profile, index) => (<SuccessStory key={index} {...profile} />));

  let storyCardsDesktop = [];
  for (let i = 0; i < storyCards.length; i += 3) {
    storyCardsDesktop.push((
      <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-clip">
        {storyCards.slice(i, i + 3)}
      </div>
    ));
  }
  return (
    <div>
      <div className="hidden 2xl:block">
        <Slider elements={storyCardsDesktop} autoplay={false} showArrow />
      </div>
      <div className="2xl:hidden">
        <Slider elements={storyCards} autoplay={false} showArrow />
      </div>
    </div>
  );
}
