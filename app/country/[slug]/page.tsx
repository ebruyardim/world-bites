type Props = {
  params: {
    slug: string;
  };
};

export default function CountryPage({ params }: Props) {
  const { slug } = params;

  return (
    <div>
      <h1>Yöresel Yemekler: {slug.toUpperCase()}</h1>
    </div>
  );
}
