import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((x) => (
        <EventItem
          key={x.id}
          id={x.id}
          title={x.title}
          date={x.date}
          location={x.location}
          image={x.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
