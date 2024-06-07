import { useRef, useState } from "react";

interface Game {
  image: string;
  alt: string;
  url: string;
}

interface Props {
  handleSearchGame: (search: string) => void;
  allGames: Game[];
  handleToogleSearch(toggle: boolean): void;
}

const Search = ({ handleSearchGame, allGames, handleToogleSearch }: Props) => {
  const [inputSearch, setInputSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputSearch) return;

    handleSearchGame(inputSearch);
    setInputSearch("");
    inputRef.current?.focus();
  };

  return (
    <>
      <form
        className="w-full h-32 mt-3 flex flex-col justify-evenly items-center bg-[#E8DCF4] "
        onSubmit={handleSubmit}>
        <label
          htmlFor="search"
          className="w-60 h-11 relative block rounded-md border border-[#B58AE0] shadow-sm focus-within:border-[#8235D0] focus-within:ring-1 focus-within:ring-[#8235D0] md:w-56">
          <input
            type="text"
            list="games"
            id="search"
            value={inputSearch}
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-center py-2 uppercase text-[#1C0830]"
            placeholder="Buscar Juego"
            ref={inputRef}
            autoFocus
            onChange={handleInputSearch}
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#E8DCF4] p-0.5 text-xs text-[#1C0830] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Buscar juego
          </span>
        </label>
        <datalist id="games">
          {allGames.map((games) => (
            <option key={games.alt} value={games.alt}>
              {games.alt}
            </option>
          ))}
        </datalist>

        <div className="w-3/4 h-10 flex justify-between  md:w-80">
          <button
            type="submit"
            className="w-[125px] h-[35px] rounded-lg tracking-wider text-[#E8DCF4]  bg-[#4F1B83]">
            Buscar
          </button>
          <button
            className="w-[125px] h-[35px] rounded-lg tracking-wider text-[#1C0830]  bg-[#CFB3EA]"
            type="button"
            onClick={() => handleToogleSearch(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
