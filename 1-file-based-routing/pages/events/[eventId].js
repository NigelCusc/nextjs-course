import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getEventById } from '../../dummydata';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import ErrorAlert from '../../components/ui/error-alert';
import EventContent from '../../components/event-detail/event-content';

function EventDetail() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event)
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center"> No events found... </p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </Fragment>
    );
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetail;
