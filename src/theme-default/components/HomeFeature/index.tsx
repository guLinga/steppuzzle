import { Feature } from 'shared/types';

export function HomeFeature(props: { features: Feature[] }) {
  // console.log('features', props.features);
  return (
    <div className="max-w-1152px" m="auto" flex="~ wrap" justify="between">
      {props.features.map((feature) => {
        const { icon, title, details, link, image } = feature;
        return (
          <a
            key={title}
            href={link}
            border="rounded-md"
            p="r-4 b-4"
            w="1/3"
            target="_blank"
            rel="noreferrer"
          >
            <article
              bg="bg-soft"
              border="~ bg-soft solid rounded-xl"
              p="6"
              h="full"
            >
              <div
                bg="gray-light-4 dark:bg-white"
                border="rounded-md"
                className="mb-5 w-12 h-12 text-3xl flex-center"
              >
                {image ? <img src={image} alt="☑️" /> : icon}
              </div>
              <h2 font="bold">{title}</h2>
              <p text="sm text-2" font="medium" className="pt-2 leading-6">
                {details}
              </p>
            </article>
          </a>
        );
      })}
    </div>
  );
}
