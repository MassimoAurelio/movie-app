export function useHandleCardClick() {
  const router = useRouter();

  const handleCardClick = (kinopoiskId: number) => {
    router.push(`/films/${kinopoiskId}`);
  };

  return { handleCardClick };
}
