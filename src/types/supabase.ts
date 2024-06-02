import { Product } from "."

export type Json = Product[]

export type Database = {
  public: {
    Tables: {
      Best: {
        Row: {
          created_at: string
          id: number
          product: number
        }
        Insert: {
          created_at?: string
          id?: number
          product: number
        }
        Update: {
          created_at?: string
          id?: number
          product?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_best_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
        ]
      }
      Comments: {
        Row: {
          created_at: string
          id: number
          message: string
          product: number
          rating: number
          user: number
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          product: number
          rating: number
          user: number
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          product?: number
          rating?: number
          user?: number
        }
        Relationships: [
          {
            foreignKeyName: "Comments_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comments_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["phoneNumber"]
          },
        ]
      }
      Orders: {
        Row: {
          created_at: string
          delivered: boolean | null
          id: number
          isDone: boolean | null
          price: number
          products: Json
          user: number
        }
        Insert: {
          created_at?: string
          delivered?: boolean | null
          id?: number
          isDone?: boolean | null
          price: number
          products: Json
          user: number
        }
        Update: {
          created_at?: string
          delivered?: boolean | null
          id?: number
          isDone?: boolean | null
          price?: number
          products?: Json
          user?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_orders_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["phoneNumber"]
          },
        ]
      }
      Products: {
        Row: {
          created_at: string
          id: number
          img: string[]
          name: string
          price: number
          qty: number
          rating: number[] | null
        }
        Insert: {
          created_at?: string
          id?: number
          img: string[]
          name: string
          price: number
          qty: number
          rating?: number[] | null
        }
        Update: {
          created_at?: string
          id?: number
          img?: string[]
          name?: string
          price?: number
          qty?: number
          rating?: number[] | null
        }
        Relationships: []
      }
      Users: {
        Row: {
          created_at: string
          firstName: string
          id: string
          lastName: string
          password: string
          phoneNumber: number
        }
        Insert: {
          created_at?: string
          firstName: string
          id?: string
          lastName: string
          password: string
          phoneNumber: number
        }
        Update: {
          created_at?: string
          firstName?: string
          id?: string
          lastName?: string
          password?: string
          phoneNumber?: number
        }
        Relationships: []
      }
    }
    Views: {
      product_rating: {
        Row: {
          average_rating: number | null
          product: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Comments_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
