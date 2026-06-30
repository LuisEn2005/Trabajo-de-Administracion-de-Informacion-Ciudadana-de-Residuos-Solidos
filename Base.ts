import { randomUUID } from 'crypto';

export type UUID = string;

export function newId(): UUID {
  return randomUUID();
}

export abstract class Entity<T> {
  protected readonly _id: UUID;

  protected constructor(id: UUID) {
    this._id = id;
  }

  get id(): UUID {
    return this._id;
  }

  equals(other?: Entity<T>): boolean {
    if (!other) return false;
    if (this === other) return true;
    return this._id === other._id;
  }
}

export abstract class ValueObject<T extends Record<string, unknown>> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  equals(other?: ValueObject<T>): boolean {
    if (!other) return false;
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  pullDomainEvents(): DomainEvent[] {
    const events = this._domainEvents;
    this._domainEvents = [];
    return events;
  }
}

export interface DomainEvent {
  readonly occurredAt: Date;
  readonly eventName: string;
}
