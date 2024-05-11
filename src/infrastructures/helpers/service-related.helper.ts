import { Between } from 'typeorm';
import { PaginatedRequest } from '../base/requests/paginated.request';
import { format } from 'date-fns';

// to add user scope to the query filters
export const applyQueryFilters = (
  query: PaginatedRequest,
  applyFilter?: string,
  orFilters: string[] = [],
) => {
  if (query.filters) {
    if (typeof query.filters === 'string') {
      query.filters = [`${query.filters},${applyFilter}`];
    } else {
      query.filters.forEach((filter, index) => {
        query.filters[index] = `${filter},${applyFilter}`;
      });
    }
  } else {
    query.filters = [`${applyFilter}`];
  }

  if (orFilters.length) {
    orFilters.forEach((filter) => {
      query.filters.push(filter);
    });
  }
};

export const applyQuerySort = (query: PaginatedRequest, applySort: string) => {
  if (query.sortBy) {
    if (typeof query.sortBy === 'string') {
      query.sortBy = [query.sortBy];
    }
    query.sortBy.push(applySort);
  } else {
    query.sortBy = [applySort];
  }
};

export const applyQueryIncludes = (
  query: PaginatedRequest,
  applyInclude: string,
) => {
  if (query.includes) {
    if (typeof query.includes === 'string') {
      query.includes = [query.includes];
    }
    query.includes.push(applyInclude);
  } else {
    query.includes = [applyInclude];
  }
};

export const BetweenDates = (from: Date | string, to: Date | string) =>
  Between(
    format(
      typeof from === 'string' ? new Date(from) : from,
      'yyyy-MM-dd hh:mm:ss',
    ),
    format(typeof to === 'string' ? new Date(to) : to, 'yyyy-MM-dd hh:mm:ss'),
  );
