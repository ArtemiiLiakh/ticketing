export interface TransactionalRepository<Session=unknown> {
  setSession(session: Session): void;
}