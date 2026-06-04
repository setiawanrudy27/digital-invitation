export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      invitations: {
        Row: {
          id: string;
          slug: string;
          title: string;
          wedding_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          wedding_date: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          wedding_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      couples: {
        Row: {
          id: string;
          invitation_id?: string;
          person_type: "groom" | "bride";
          full_name: string;
          nickname: string | null;
          father_name: string | null;
          mother_name: string | null;
          child_order: string | null;
          instagram_username: string | null;
          photo_url: string | null;
          cover_photo_url: string | null;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          person_type: "groom" | "bride";
          full_name: string;
          nickname?: string | null;
          father_name?: string | null;
          mother_name?: string | null;
          child_order?: string | null;
          instagram_username?: string | null;
          photo_url?: string | null;
          cover_photo_url?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          person_type?: "groom" | "bride";
          full_name?: string;
          nickname?: string | null;
          father_name?: string | null;
          mother_name?: string | null;
          child_order?: string | null;
          instagram_username?: string | null;
          photo_url?: string | null;
          cover_photo_url?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          invitation_id?: string;
          title: string;
          start_date: string;
          end_date: string | null;
          until_finish: boolean;
          timezone: string;
          place_name: string | null;
          google_maps_link: string | null;
          address: string | null;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          title: string;
          start_date: string;
          end_date?: string | null;
          until_finish?: boolean;
          timezone?: string;
          place_name?: string | null;
          google_maps_link?: string | null;
          address?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          title?: string;
          start_date?: string;
          end_date?: string | null;
          until_finish?: boolean;
          timezone?: string;
          place_name?: string | null;
          google_maps_link?: string | null;
          address?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      guests: {
        Row: {
          id: string;
          invitation_id?: string;
          name: string;
          address: string | null;
          phone: string | null;
          email: string | null;
          slug: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          name: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          slug?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          name?: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          slug?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery_photos: {
        Row: {
          id: string;
          invitation_id?: string;
          photo_url: string;
          display_order: number;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          photo_url: string;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          photo_url?: string;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
        };
      };
      gallery_videos: {
        Row: {
          id: string;
          invitation_id?: string;
          youtube_url: string;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          youtube_url: string;
          is_visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          youtube_url?: string;
          is_visible?: boolean;
          created_at?: string;
        };
      };
      live_streaming: {
        Row: {
          id: string;
          invitation_id?: string;
          stream_url: string;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          stream_url: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          stream_url?: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      music: {
        Row: {
          id: string;
          invitation_id?: string;
          music_url: string;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          music_url: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          music_url?: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      wedding_frame: {
        Row: {
          id: string;
          invitation_id?: string;
          frame_url: string;
          frame_url_instagram: string | null;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          frame_url: string;
          frame_url_instagram?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          frame_url?: string;
          frame_url_instagram?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      love_stories: {
        Row: {
          id: string;
          invitation_id?: string;
          story_date: string;
          photo_url: string | null;
          description: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          story_date: string;
          photo_url?: string | null;
          description: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          story_date?: string;
          photo_url?: string | null;
          description?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      quotes: {
        Row: {
          id: string;
          invitation_id?: string;
          text: string;
          source: string | null;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          text: string;
          source?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          text?: string;
          source?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bank_accounts: {
        Row: {
          id: string;
          invitation_id?: string;
          bank_name: string;
          account_number: string;
          account_holder: string;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          bank_name: string;
          account_number: string;
          account_holder: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          bank_name?: string;
          account_number?: string;
          account_holder?: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      qris: {
        Row: {
          id: string;
          invitation_id?: string;
          qris_url: string;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          qris_url: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          qris_url?: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      rsvps: {
        Row: {
          id: string;
          invitation_id?: string;
          guest_name: string;
          guest_slug: string | null;
          attending: boolean;
          guest_count: number;
          message: string | null;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          guest_name: string;
          guest_slug?: string | null;
          attending: boolean;
          guest_count?: number;
          message?: string | null;
          is_visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          guest_name?: string;
          guest_slug?: string | null;
          attending?: boolean;
          guest_count?: number;
          message?: string | null;
          is_visible?: boolean;
          created_at?: string;
        };
      };
      thank_you: {
        Row: {
          id: string;
          invitation_id?: string;
          photo_url: string | null;
          message: string;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          photo_url?: string | null;
          message: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          photo_url?: string | null;
          message?: string;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          invitation_id?: string;
          show_couple_photo: boolean;
          show_events: boolean;
          show_love_story: boolean;
          show_gallery: boolean;
          show_quote: boolean;
          show_rsvp: boolean;
          payment_method: "transfer" | "qris" | "both";
          whatsapp_template: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id?: string;
          show_couple_photo?: boolean;
          show_events?: boolean;
          show_love_story?: boolean;
          show_gallery?: boolean;
          show_quote?: boolean;
          show_rsvp?: boolean;
          payment_method?: "transfer" | "qris" | "both";
          whatsapp_template?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          show_couple_photo?: boolean;
          show_events?: boolean;
          show_love_story?: boolean;
          show_gallery?: boolean;
          show_quote?: boolean;
          show_rsvp?: boolean;
          payment_method?: "transfer" | "qris" | "both";
          whatsapp_template?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      Views: Record<string, never>;
      Functions: Record<string, never>;
      Enums: Record<string, never>;
      CompositeTypes: Record<string, never>;
    };
  };
};
