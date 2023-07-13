/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useMemo } from "react";
import Collabseable from "../components/ui/collapseable";
import Category from "../components/ui/home/category";

const Home = ({ canData }) => {
  const otherCategory = "Other";
  const categoryOrder = [
    "World Building",
    "Characters and Monsters",
    "Items",
    "Journeys",
    "Other",
  ];

  const categories = useMemo(() => {
    const arr = {};
    canData.forEach((template) => {
      if (
        template.meta &&
        template.meta.categories &&
        Array.isArray(template.meta.categories)
      ) {
        template.meta.categories.forEach((categoryName) => {
          if (!arr[categoryName]) arr[categoryName] = [];
          arr[categoryName].push(template);
        });
      } else {
        if (!arr[otherCategory]) arr[otherCategory] = [];
        arr[otherCategory].push(template);
      }
    });
    return arr;
  }, [canData]);

  const sortedKeys = (categories) => {
    return (
      Object.keys(categories ?? {}).sort(
        (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
      ) ?? []
    );
  };

  console.log(categories, sortedKeys(categories));

  return (
    <>
      <Head>
        <title>Character in a Can</title>
      </Head>
      <div>
        <div className="h-wrapper">
          <h1 className="text-center">Character in a Can</h1>
        </div>
        <div className="content">
          <div className="intro">
            <h3 className="text-center">Who uses Character in a Can?</h3>
            <Collabseable title="Game Masters">
              <p>
                <span>
                  The best friend of the harried GM: whether creating NPCs from
                  scratch with our NPC generator or fleshing out your story
                  through guilds and factions, worldbuilding has never been
                  easier!&nbsp;
                </span>
              </p>
              <p>
                <span>
                  Design your own campaign setting from whole cloth: clothing,
                  taverns, aesthetics, heraldry, fantasy, sci-fi, wild west, or
                  post-apocalyptic!
                </span>
              </p>
              <p>
                <span>
                  Whip up your own mix-and-match bestiary with our monster
                  generator, or use our dragon generator to create unique and
                  memorable bosses to defeat.
                </span>
              </p>
              <p>
                <span>
                  Never be caught flat-footed by an unpredictable party --
                  quickly roll NPCs or design quests on the fly with Character
                  in a Can!
                </span>
              </p>
            </Collabseable>
            <Collabseable title="Roleplayers">
              <p>
                <span>
                  Create real, multi-dimensional, and fun-to-play character
                  ideas that will leap off the page and into your session!&nbsp;
                </span>
              </p>
              <p>
                <span>
                  Likes and dislikes, merits and flaws, even outfits, jobs, and
                  physical appearance -- Character in a Can can procedurally
                  generate a persona that players can easily step into.
                </span>
              </p>
              <p>
                <span>
                  Our idea generator can even concoct a complete character
                  backstory!
                </span>
              </p>
              <p>
                <span>
                  Whether it&apos;s Dungeons and Dragons or any other
                  roleplaying game, players can step up to the table with
                  confidence and pride in their creations.
                </span>
              </p>
            </Collabseable>

            <Collabseable title="Artists">
              <p>
                <span>Every artist knows that </span>
                <i>
                  <span>how</span>
                </i>
                <span> to create is only half the battle -- </span>
                <i>
                  <span>what </span>
                </i>
                <span>to create is just as much of a challenge!</span>
              </p>
              <p>
                <span>
                  We could all use a new idea, and with procedural generation,
                  art inspiration is never far.
                </span>
              </p>
              <p>
                <span>
                  Whether it&apos;s OCs, costumes, dragons, or strange beasts,
                  find unique and inspiring prompts to get your creative juices
                  flowing and challenge your abilities!
                </span>
              </p>
            </Collabseable>
            <Collabseable title="Writers">
              <p>
                <span>
                  From the subtle turmoil of a single character, to the
                  magnitude of a war between empires, your story comes to life
                  through Character in a Can!
                </span>
              </p>
              <p>
                <span>
                  Use a monster generator to describe a bone-chilling encounter,
                  or a worldbuilding generator to weave whole nations.
                </span>
              </p>
              <p>
                <span>
                  Writers who struggle with appearance will love our tools to
                  flesh out a character&apos;s attributes, while worldbuilders
                  and epic storytellers will lose themselves in rich, living
                  worlds waiting to be explored.
                </span>
              </p>
              <p>
                <span>
                  The story is already in you -- let us set the foundations and
                  watch it grow!
                </span>
              </p>
              <p>
                <b>GAME DESIGNERS</b>
              </p>
              <p>
                <span>
                  As game designers, we know -- no player wants to talk to the
                  same cardboard cutout fifty times, but creating
                  three-dimensional NPCs takes work!
                </span>
              </p>
              <p>
                <span>
                  Our NPC generators create high-quality encounters with the
                  click of a mouse, without burning up your precious time.
                </span>
              </p>
              <p>
                <span>
                  Let us shoulder the strain of inventing colorful and unique
                  characters -- you get back to making your game excel!
                </span>
              </p>
            </Collabseable>
            <div className="intro-kofi-btn">
              <a
                href="https://ko-fi.com/cynderbark/tiers"
                target="_blank"
                rel="noreferrer"
                className="btn-kofi-home"
              >
                <img src="/images/brands/kofi.png" alt="Support me on Ko-fi" />
              </a>
            </div>
          </div>

          <div className="templates">
            {sortedKeys(categories).map((categoryName, i) => {
              return (
                <Category
                  key={i}
                  title={categoryName}
                  templates={categories[categoryName]}
                />
              );
            })}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

Home.layout = "home";
Home.id = "home";

export default Home;
