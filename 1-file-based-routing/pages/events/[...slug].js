import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getFeaturedEvents } from '../../dummydata';
import EventList from '../../components/events/event-list';
import ErrorAlert from '../../components/ui/error-alert';
import ResultsTitle from '../../components/events/results-title';

function FilteredEvents() {
  const router = useRouter();
  const filterData = router.query.slug; // Array
  if (!filterData) {
    // we might not have access right away
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center"> Invalid Filter... </p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </Fragment>
    );
  }

  const filteredEvents = getFeaturedEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center"> No events found... </p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEvents;
