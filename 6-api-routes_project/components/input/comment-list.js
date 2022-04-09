import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items &&
        items.map((item) => (
          <li key={item._id}>
            <p>{item.text}</p>
            <div>By {item.name}</div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
