-- Add INVITE_REWARD to LedgerReason enum for rewarding invite creators
ALTER TYPE "LedgerReason" ADD VALUE 'INVITE_REWARD' AFTER 'INVITE_BONUS';
