use crate::CreateEvent;
use anchor_lang::prelude::*;

pub struct EventManager {}

impl EventManager {
    pub fn run_create_event(
        ctx: Context<CreateEvent>,
        title: String,
        description: String,
        date: i64,
        location: String,
        ticket_price: u64,
    ) -> Result<()> {
        let event = &mut ctx.accounts.event; 

        event.title = title;
        event.description = description;
        event.date = date;
        event.location = location;
        event.organizer = *ctx.accounts.organizer.key; 
        event.ticket_price = ticket_price; 

        Ok(())
    }
}
