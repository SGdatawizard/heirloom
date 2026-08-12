export type Holding = {
  id: string;
  owner_id: string;
  reference: string | null;
  title: string;
  detail: string | null;
  vertical: 'great-britain' | 'commonwealth' | 'numismatics' | 'trading-cards' | string;
  acquired_on: string | null;
  acquisition_price: number | null;
  current_valuation: number | null;
  valued_on: string | null;
  status: 'held' | 'in-storage' | 'with-client' | 'consigned' | 'sold' | string;
  storage: string | null;
  certificate: string | null;
  image_path: string | null;
  provenance: { stage: string; detail: string }[] | null;
  created_at: string;
};

export type Valuation = {
  id: string;
  holding_id: string | null;
  owner_id: string;
  valued_on: string;
  value: number;
  method: string | null;
  note: string | null;
  holdings?: { title: string; reference: string | null } | null;
};

export type ClientDocument = {
  id: string;
  owner_id: string;
  holding_id: string | null;
  title: string;
  kind: 'valuation' | 'agreement' | 'certificate' | 'provenance' | 'invoice' | string;
  storage_path: string | null;
  issued_on: string | null;
};

export type Profile = {
  id: string;
  full_name: string | null;
  tier: string | null;
  relationship_manager: string | null;
  specialist: string | null;
  client_since: string | null;
  country: string | null;
  role: 'client' | 'adviser' | 'staff' | string;
};
