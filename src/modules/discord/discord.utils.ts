import { GuildMemberRoleManager, Role } from 'discord.js';
import { Command } from './discord.types';

export function roleCheck(
  { roleNeeded }: Command,
  roles: GuildMemberRoleManager | undefined
): boolean {
  if (!roleNeeded) return true;
  const memberRoles = roles?.cache.map((role: Role) => {
    return role.name;
  });

  return memberRoles?.includes(roleNeeded) ?? false;
}
