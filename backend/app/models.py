from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, EmailStr, HttpUrl, Field


class HealthResponse(BaseModel):
    status: Literal["ok"]


class Link(BaseModel):
    label: str = Field(min_length=1)
    url: HttpUrl


class ProfileResponse(BaseModel):
    name: str = Field(min_length=1)
    role: str = Field(min_length=1)
    tagline: str = Field(min_length=1)
    location: str = Field(min_length=1)
    email: EmailStr
    phone: str | None = None
    links: list[Link] = Field(default_factory=list)
    highlights: list[str] = Field(default_factory=list)


class CvPersonal(BaseModel):
    name: str = Field(min_length=1)
    location: str = Field(min_length=1)
    nationality: str = Field(min_length=1)
    email: EmailStr
    phone: str = Field(min_length=1)
    languages: list[str] = Field(default_factory=list)


class CvExperience(BaseModel):
    start: str = Field(min_length=1)
    end: str = Field(min_length=1)
    company: str = Field(min_length=1)
    role: str = Field(min_length=1)
    details: list[str] = Field(default_factory=list)


class CvEducation(BaseModel):
    school: str = Field(min_length=1)
    degree: str = Field(min_length=1)
    period: str = Field(min_length=1)


class CvCertification(BaseModel):
    school: str = Field(min_length=1)
    degree: str = Field(min_length=1)
    period: str = Field(min_length=1)


class CvResponse(BaseModel):
    summary: str = Field(min_length=1)
    personal: CvPersonal
    skills: list[str] = Field(default_factory=list)
    experience: list[CvExperience] = Field(default_factory=list)
    education: list[CvEducation] = Field(default_factory=list)
    certifications: list[CvCertification] = Field(default_factory=list)
    hobby: list[str] = Field(default_factory=list)


class ProjectResponse(BaseModel):
    name: str = Field(min_length=1)
    year: int
    project_technically_led: bool = False
    was_llm_used: bool = False
    was_agents_used: bool = False
    summary: str = Field(min_length=1)
    stack: list[str] = Field(default_factory=list)
    impact: str = Field(min_length=1)
    icon: str = Field(min_length=1)
    business_description: str = Field(min_length=1)
    technical_description: str = Field(min_length=1)
    scope: str = Field(min_length=1)
    highlights: list[str] | None = Field(default=None)


class TechnologyResponse(BaseModel):
    name: str = Field(min_length=1)
    start: str = Field(min_length=1)
    description: str = Field(min_length=1)


class InfoPointResponse(BaseModel):
    id: str = Field(min_length=1)
    title: str = Field(min_length=1)
    body: str = Field(min_length=1)
    offset: int
    top: str = Field(min_length=1)


class EvangelistPanelResponse(BaseModel):
    title: str = Field(min_length=1)
    body: str = Field(min_length=1)



