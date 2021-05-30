import { NoteName } from 'constants/note';

export const Note: React.VFC<{
  name: NoteName;
}> = ({ name }) => {
  return (
    <span>
      <span>{name.base}</span>
      {name.half && <span>{name.half === 'sharp' ? '♯' : '♭'}</span>}
    </span>
  );
};
