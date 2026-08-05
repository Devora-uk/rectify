export const hireVolumeOptions = [
  '1-2',
  '3-5',
  '6-10',
  '10+',
  'Not sure yet but the need is real',
] as const;

export const hiringApproachOptions = [
  'Internal recruitment team',
  'Preferred supplier agencies',
  'Ad hoc agency briefings',
  'Job boards and direct adverts',
  'Executive search for senior roles',
  'We are building this out for the first time',
] as const;

export type HireVolumeOption = (typeof hireVolumeOptions)[number];
export type HiringApproachOption = (typeof hiringApproachOptions)[number];

export type PartnerApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  website?: string;
  companyName: string;
  sector: string;
  geography: string;
  hireVolume: string;
  hardRoles: string;
  processBreakdown: string;
  hiringApproaches: string[];
  successLook: string;
  decisionMakerName: string;
  decisionMakerTitle: string;
  whyNow: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function validatePartnerApplication(body: unknown) {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid application' as const };
  }

  const data = body as Record<string, unknown>;
  const payload: PartnerApplicationPayload = {
    name: asTrimmedString(data.name),
    email: asTrimmedString(data.email),
    phone: asTrimmedString(data.phone),
    website: asTrimmedString(data.website),
    companyName: asTrimmedString(data.companyName),
    sector: asTrimmedString(data.sector),
    geography: asTrimmedString(data.geography),
    hireVolume: asTrimmedString(data.hireVolume),
    hardRoles: asTrimmedString(data.hardRoles),
    processBreakdown: asTrimmedString(data.processBreakdown),
    hiringApproaches: Array.isArray(data.hiringApproaches)
      ? data.hiringApproaches.map(asTrimmedString).filter(Boolean)
      : [],
    successLook: asTrimmedString(data.successLook),
    decisionMakerName: asTrimmedString(data.decisionMakerName),
    decisionMakerTitle: asTrimmedString(data.decisionMakerTitle),
    whyNow: asTrimmedString(data.whyNow),
  };

  const requiredText = [
    payload.name,
    payload.email,
    payload.phone,
    payload.companyName,
    payload.sector,
    payload.geography,
    payload.hardRoles,
    payload.processBreakdown,
    payload.successLook,
    payload.decisionMakerName,
    payload.decisionMakerTitle,
    payload.whyNow,
  ];

  if (requiredText.some((value) => !value)) {
    return { error: 'Please complete every required field' as const };
  }

  if (!emailPattern.test(payload.email)) {
    return { error: 'Please enter a valid work email' as const };
  }

  if (!hireVolumeOptions.includes(payload.hireVolume as HireVolumeOption)) {
    return { error: 'Please select how many technical hires you are planning' as const };
  }

  const validApproaches = payload.hiringApproaches.filter((approach) =>
    hiringApproachOptions.includes(approach as HiringApproachOption),
  );

  if (validApproaches.length === 0) {
    return { error: 'Please select at least one current hiring approach' as const };
  }

  return {
    payload: {
      ...payload,
      hiringApproaches: validApproaches,
    },
  };
}
