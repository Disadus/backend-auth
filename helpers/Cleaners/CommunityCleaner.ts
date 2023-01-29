import { CleanedDisadusCommunity } from "../Types/CleanedDisadusTypes";
import { DisadusCommunity } from "../Types/RawDisadusTypes";

export class CommunityCleaner {
  static getLMSProvider(community: DisadusCommunity) {
    const providers = ["schoology"];
    //@ts-expect-error
    return providers.find((provider) => community[provider] !== undefined);
  }
  static CleanCommunity(community: DisadusCommunity) {
    if (!community) return;
    community.schoology;
    return {
      name: community.name,
      description: community.description,
      image: community.image,
      id: community.id,
      members: community.members,
      admins: community.admins,
      creator: community.creator,
      createdAt: community.createdAt,
      colors: community.colors,
      provider: CommunityCleaner.getLMSProvider(community),
      vanitybg: community.vanitybg,
      plugins: community.plugins,
      verified: community.verified,
      schoology: community.schoology && {
        domain: community.schoology?.domain,
      },
    } as CleanedDisadusCommunity;
  }
}
