import { Token } from 'typedi';
import { ICommand } from '../discord.types';

export const CommandToken = new Token<ICommand>('commands');
